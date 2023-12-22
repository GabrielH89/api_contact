import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IContato } from "../../models";

export const getById = async (id: number): Promise<IContato | Error> => {
    try{
        const result = await Knex(ETableNames.contato)
        .select('*')
        .where('id', '=', id)
        .first()
        
        if(result) return result;
        return new Error('Registro não encontrado');
    }catch(error){
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
}