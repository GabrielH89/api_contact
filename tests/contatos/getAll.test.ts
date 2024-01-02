import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('getAll - Contatos', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'contato@gmail.com';
        await testServer.post('/signup').send({nome: 'contato', email, senha: 'cont1234'});
        const signinRes = await testServer.post('/signin').send({email, senha: 'cont1234'});
        accessToken = signinRes.body.accessToken;
    });

    it('Busca todos os registros do banco', async () => {
        const res = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: 'Gabriel', numero: 819182937});
        expect(res.statusCode).toBe(StatusCodes.CREATED);

        const registrosBuscados = await testServer.get('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send();
        expect(registrosBuscados.statusCode).toBe(StatusCodes.OK);
        expect(registrosBuscados.body.length).toBeGreaterThan(0);
    }),
    it('Tenta buscar todos os registros do banco, sem o token de acesso', async () => {
       

        const registrosBuscados = await testServer.get('/contacts')
        .send();
        expect(registrosBuscados.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        expect(registrosBuscados.body).toHaveProperty('errors.default');
    })
})


