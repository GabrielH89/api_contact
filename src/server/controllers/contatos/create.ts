import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IContato {
    nome: string;
    numero: string;
};

interface IFilter {
    filter?: string;
};

export const createValidation = validation((getSchema) => ({
    body: getSchema<IContato>(yup.object().shape({
        nome: yup.string().required().min(3),
        numero: yup.string().required().min(9), 
    })),
    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().min(3),
    })),
}));

export const create = async (req: Request<{}, {}, IContato>, res: Response) => {
    return res.status(StatusCodes.CREATED).send("Created");
};