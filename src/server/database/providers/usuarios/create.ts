import { ETableNames } from "../../ETableNames";
import { IUsuario } from "../../models/usuario";
import { Knex } from "../../knex";

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
    try{
        const [result] = await Knex(ETableNames.usuario).insert(usuario).returning('id');
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

