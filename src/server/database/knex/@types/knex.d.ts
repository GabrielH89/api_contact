import { IContato } from "../../models"

declare module 'knex/types/tables' {
    interface Tables{
        contato: IContato
        //pessoa: IPessoa
        //usuario: IUsuario
    }
}