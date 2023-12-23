import { ETableNames } from '../../ETableNames';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';

export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.contato)
      .where('id', '=', pessoa.contatoId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('O contato usado no cadastro não foi encontrado');
    }

    const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id');
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};

