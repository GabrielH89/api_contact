import { testServer }from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Pessoas - getAll', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'contato@gmail.com';
        await testServer.post('/signup').send({nome: 'contato', email, senha: 'cont9915'});
        const signInRes = await testServer.post('/signin').send({email, senha: 'cont9915'});
        accessToken = signInRes.body.accessToken;
    });

    let contatoId: number | undefined;
    beforeAll(async () => {
        const resContato = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Maria", numero: '899762726'});
        contatoId = resContato.body;
    })

    it('Busca os registro do banco', async () => {
        const response = await testServer.post('/peoples')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nomeCompleto: 'Gabriel', email: 'gabriel@gmail.com', contatoId});
        expect(response.statusCode).toBe(StatusCodes.CREATED);

        const registrosBuscados = await testServer.get('/peoples')
        .set({Authorization: `Bearer ${accessToken}`})
        .send();
        expect(registrosBuscados.statusCode).toBe(StatusCodes.OK);
    }),
    it('Tenta buscar os registro do banco, sem o token de acesso', async () => {
        const response = await testServer.post('/peoples')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nomeCompleto: 'Maria', email: 'maria@gmail.com', contatoId});
        expect(response.statusCode).toBe(StatusCodes.CREATED);

        const registrosBuscados = await testServer.get('/peoples')
        .send();
        expect(registrosBuscados.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    })
})

