import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Pessoas - create', () => {
    let contatoId: number | undefined = undefined;
    beforeAll(async () => {
      const resCidade = await testServer.post('/contacts')
        .send({ nome: 'Samara', numero: '8191782727'});
        contatoId = resCidade.body;
    });
  
    it('Cria registro', async () => {
        const response = await testServer.post('/peoples')
        .send({nomeCompleto: 'Gabriel', email: 'gab@gmail.com', contatoId});
        expect(response.statusCode).toBe(StatusCodes.CREATED);
    }),
    it('Tenta criar registro com um email já existente na tabela pessoas', async () => {
        const response = await testServer.post('/peoples')
        .send({nomeCompleto: 'Beatriz', email: 'beatriz@gmail.com', contatoId});
        expect(response.statusCode).toBe(StatusCodes.CREATED);

        const response2 = await testServer.post('/peoples')
        .send({nomeCompleto: 'paulo', email: 'beatriz@gmail.com', contatoId});
        expect(response2.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);

    }),
    it('Tenta criar registro com o nome menor que 3 caracteres', async () => {
        const response = await testServer.post('/peoples')
        .send({nomeCompleto: 'Ga', email: 'gab@gmail.com', contatoId});
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.nomeCompleto');
    }),
    it('Tenta criar registro com o email menor que 9 caracteres', async () => {
        const response = await testServer.post('/peoples')
        .send({nomeCompleto: 'Gabriel', email: 'gab@gam', contatoId});
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.email');
    }),
    it('Tenta criar registro, cujo id do contato é inexistente', async () => {
        const response = await testServer.post('/peoples')
        .send({nomeCompleto: 'Gabriel', email: 'gabriel@gmail.com', contatoId: -1});
        expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
    }),
    it('Tenta criar registro sem o campo nomeCompleto', async () => {
        const response = await testServer.post('/peoples')
        .send({email: 'gab@gam', contatoId});
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.nomeCompleto');
    }),
    it('Tenta criar registro sem o campo email', async () => {
        const response = await testServer.post('/peoples')
        .send({nomeCompleto: 'Gabriel', contatoId});
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.email');
    }),
    it('Tenta criar registro sem o campo contatoId', async () => {
        const response = await testServer.post('/peoples')
        .send({nomeCompleto: 'Gabriel', email: 'gabriel@gmail.com'});
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.contatoId');
    })
})

