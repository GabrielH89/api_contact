import * as count from './count';
import * as create from './create';
import * as deleteById from './deleteById';
import * as getAll from './getAll';
import * as getById from './getById';
import * as updateById from './updateById';

export const PessoasProvider = {
    ...count, ...create, ...deleteById, ...getAll, ...getById, ...updateById
}
