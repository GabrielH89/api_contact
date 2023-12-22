import { ETableNames } from '../../ETableNames';
import { IContato } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, contato: Omit<IContato, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.contato)
      .update(contato)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};