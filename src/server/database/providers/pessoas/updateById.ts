import { ETableNames } from '../../ETableNames';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.contato)
      .where('id', '=', pessoa.contatoId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('O contato usado no cadastro não foi encontrado');
    }

    const result = await Knex(ETableNames.pessoa)
      .update(pessoa)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};