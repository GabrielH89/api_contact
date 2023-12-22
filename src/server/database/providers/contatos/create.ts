import { ETableNames } from "../../ETableNames";
import { IContato } from "../../models";
import { Knex } from "../../knex";

export const create = async (contato: Omit<IContato, 'id'>): Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.contato).insert(contato).returning('id');
        if(typeof result === 'object'){
            return result.id;
        }else{
            return result;
        }
    }catch(error){
        console.log(error);
        return new Error('Erro ao cadastrar registro');
    }
}

