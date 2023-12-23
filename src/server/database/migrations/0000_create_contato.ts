import { Knex} from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.contato, table => {
        table.bigIncrements('id').primary().index();
        table.string('nome', 100).checkLength('<=', 100).index().notNullable();
        table.string('numero', 25).checkLength('<=', 25).index().notNullable();

        table.comment('Tabela usada para armazenar contato no sistema');
    }).then(() => {
        console.log(`Created table ${ETableNames.contato}`);
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.contato)
    .then(() => {
        console.log(`Dropped table ${ETableNames.contato}`)
    })
}