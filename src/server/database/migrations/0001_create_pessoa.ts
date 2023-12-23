import { Knex} from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.pessoa, table => {
        table.bigIncrements('id').primary().index();
        table.string('nomeCompleto', 100).checkLength('<=', 100).index().notNullable();
        table.string('email', 150).checkLength('<=', 150).unique().notNullable();

        table
        .bigInteger('contatoId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.contato)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')

        table.comment('Tabela usada para armazenar pessoa no sistema');
    }).then(() => {
        console.log(`Created table ${ETableNames.pessoa}`);
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.pessoa)
    .then(() => {
        console.log(`Dropped table ${ETableNames.pessoa}`)
    })
}