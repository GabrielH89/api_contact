import { Knex } from "knex";

import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
    const [{count}] = await knex(ETableNames.contato).count<[{ count: number }]>('* as count');
    if(!Number.isInteger(count) || Number(count) > 0) return;

    const contatosToInsert = contacts.map(contact => ({ nome: contact.nome, numero: contact.numero}));
    await knex(ETableNames.contato).insert(contatosToInsert);
}

const contacts = [
    {nome: 'Gabriel', numero: '9181728282'},
    {nome: 'Samara', numero: '9272625262'},
    {nome: 'Julia', numero: '8163202082'},
    {nome: 'Manoel', numero: '9171615512'},
]

