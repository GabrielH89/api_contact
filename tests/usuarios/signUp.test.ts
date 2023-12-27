import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Usuarios - signUp', () => {
    it('Cria registro', async () => {
        const response = await testServer.post('/signup')
        .send({nome: "Gabriel", email: "gabriel@gmail.com", senha: "gab1234"});
        expect(response.statusCode).toBe(StatusCodes.CREATED);
    }),
    it('Tenta criar registro com um e-mail já existente na tabela usuario', async () => {
        const response = await testServer.post('/signup')
        .send({nome: "Samara", email: "samara@gmail.com", senha: "sa1234"});
        expect(response.statusCode).toBe(StatusCodes.CREATED);

        const response2 = await testServer.post('/signup')
        .send({nome: "Julia", email: "samara@gmail.com", senha: "sa1234"});
        expect(response2.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    }),
    it('Tenta criar registro com o nome menor que 3 caracteres', async () => {
        const response = await testServer.post('/signup')
        .send({nome: "Ti", email: "tiago@gmail.com", senha: "tig1234"});
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.nome');
    }),
    it('Tenta criar registro com o email menor que 6 caracteres', async () => {
        const response = await testServer.post('/signup')
        .send({nome: "Tiago", email: "tiag", senha: "tig1234"});
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.email');
    }),
    it('Tenta criar registro com a senha menor que 6 caracteres', async () => {
        const response = await testServer.post('/signup')
        .send({nome: "Tiago", email: "tiago@gmail.com", senha: "tig"});
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.senha');
    })
})

