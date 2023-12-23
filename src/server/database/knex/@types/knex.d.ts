import { IContato } from "../../models"
import { IPessoa } from "../../models"

declare module 'knex/types/tables' {
    interface Tables{
        contato: IContato
        pessoa: IPessoa
        //usuario: IUsuario
    }
}