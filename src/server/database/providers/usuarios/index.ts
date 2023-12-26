import * as create from './create';
import * as getByEmail from './getByEmail';

export const UsuariosProvider = {
    ...create, ...getByEmail
}