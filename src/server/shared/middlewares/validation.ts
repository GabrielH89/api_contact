import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
//A seguir são importados do módulo 'yup', que é uma biblioteca de validação de esquema para JavaScript e TypeScript.
import { Schema, ValidationError } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T>(schema: Schema<T>) => Schema<T>

//É um tipo que representa todos os esquemas a serem validados, mapeados por propriedade.
type TAllSchemas = Record<TProperty, Schema<any>>;

//É uma função que pega uma função para obter esquemas e retorna uma coleção parcial de esquemas a serem validados.
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

//Função que pega todas as coleções parciais de esquemas e retorna um middleware do Express.
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

//É a função principal exportada. Ela aceita uma função getAllSchemas que obtém esquemas e retorna um middleware 
export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas((schema) => schema);

  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach(error => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
      });

      errorsResult[key] = errors;
    }
  });

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  }
};



