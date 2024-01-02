import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Pessoas - updateById', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'contato@gmail.com';
        await testServer.post('/signup').send({nome: 'contato', email, senha: 'cont1234'});
        const signinRes = await testServer.post('/signin').send({email, senha: 'cont1234'});
        accessToken = signinRes.body.accessToken;
    });

    let contatoId: number | undefined;
    beforeAll(async () =>{
        const resContato = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Gabriel", numero: "879202846"});
        contatoId = resContato.body;
    });

    it('Atualiza registro', async () => {
        const response = await testServer.post('/peoples')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nomeCompleto: "Samara", email: "samara@gmail.com", contatoId})
        expect(response.statusCode).toBe(StatusCodes.CREATED);

        const registroAtualizado = await testServer.put(`/peoples/${response.body}`)
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nomeCompleto: "Laura", email: "laura@gmail.com", contatoId});
        expect(registroAtualizado.statusCode).toBe(StatusCodes.NO_CONTENT);
    }),
    it('Tenta atualizar registro, sem o token de acesso', async () => {
        const response = await testServer.post('/peoples')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nomeCompleto: "Samara", email: "samara@gmail.com", contatoId})
        expect(response.statusCode).toBe(StatusCodes.CREATED);

        const registroAtualizado = await testServer.put(`/peoples/${response.body}`)
        .send({nomeCompleto: "Laura", email: "laura@gmail.com", contatoId});
        expect(registroAtualizado.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        expect(registroAtualizado.body).toHaveProperty('errors.default');
    }),
    it('Tenta atualizar registro que não existe', async () => {
        const registroAtualizado = await testServer.put(`/peoples/999`)
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nomeCompleto: "Laura", email: "laura@gmail.com", contatoId});
        expect(registroAtualizado.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(registroAtualizado.body).toHaveProperty('errors.default');
    })
})

