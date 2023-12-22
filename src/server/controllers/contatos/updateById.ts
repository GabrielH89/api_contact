import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { IContato } from '../../database/models';
import { ContatosProvider } from '../../database/providers/contatos';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IContato, 'id'>{};

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    numero: yup.string().required().min(9),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  /*if(Number(req.params.id) === 999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
        default: 'Registro não encontrado'
    }
  })

  return res.status(StatusCodes.NO_CONTENT).send();*/

  if(!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro id precisa ser informado"
      }
    });
  }

  const result = await ContatosProvider.updateById(req.params.id, req.body);
  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};

