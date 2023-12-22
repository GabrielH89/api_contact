import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IContato } from "../../database/models";
import { ContatosProvider } from '../../database/providers/contatos';

interface IBodyProps extends Omit<IContato, 'id'>{};

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        numero: yup.string().required().min(9), 
    }))
}));

export const create = async (req: Request<{}, {}, IContato>, res: Response) => {
    //return res.status(StatusCodes.CREATED).json(1);
    const result = await ContatosProvider.create(req.body);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};