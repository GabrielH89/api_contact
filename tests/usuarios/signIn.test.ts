import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Usuarios - signIn', () => {
    beforeAll(async () => {
        await testServer.post('/signup')
        .send({nome: "Gabriel", email: "gabriel@gmail.com", senha: "ga71801"});
    })
    it('Login feito com sucesso', async () => {
        const registro = await testServer.post('/signin')
        .send({email: "gabriel@gmail.com", senha: "ga71801"});
        expect(registro.statusCode).toBe(StatusCodes.OK);
        expect(registro.body).toHaveProperty('accessToken');
    }),
    it('Tenta fazer login com um email diferente do cadastrado', async () => {
        const registro = await testServer.post('/signin')
        .send({email: "maria@gmail.com", senha: "ga71801"});
        expect(registro.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        expect(registro.body).toHaveProperty('errors.default');
    }),
    it('Tenta fazer login com uma senha diferente da cadastrada', async () => {
        const registro = await testServer.post('/signin')
        .send({email: "gabriel@gmail.com", senha: "gb81919"});
        expect(registro.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        expect(registro.body).toHaveProperty('errors.default');
    }),
    it('Tenta fazer login com um formato de email inválido ', async () => {
        const registro = await testServer.post('/signin')
        .send({email: "gabrieuahanb.com", senha: "ga71801"});
        expect(registro.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(registro.body).toHaveProperty('errors.body.email');
    }),
    it('Tenta fazer login com um email menor que 5 caracteres', async () => {
        const registro = await testServer.post('/signin')
        .send({email: "gab@", senha: "gb81919"});
        expect(registro.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(registro.body).toHaveProperty('errors.body.email');
    }),
    it('Tenta fazer login com uma senha menor que 6 caracteres', async () => {
        const registro = await testServer.post('/signin')
        .send({email: "gabriel@gmail.com", senha: "gb81"});
        expect(registro.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(registro.body).toHaveProperty('errors.body.senha');
    })
})
