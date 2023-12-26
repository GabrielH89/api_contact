import { IContato } from "../../models"
import { IPessoa } from "../../models"
import { IUsuario } from "../../models/usuario"

declare module 'knex/types/tables' {
    interface Tables{
        contato: IContato
        pessoa: IPessoa
        usuario: IUsuario
    }
}