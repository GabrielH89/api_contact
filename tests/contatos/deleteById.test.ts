import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Contatos - getById', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'contato@gmail.com';
        await testServer.post('/signup').send({nome: 'contato', email, senha: 'cont9915'});
        const signInRes = await testServer.post('/signin').send({email, senha: 'cont9915'});
        accessToken = signInRes.body.accessToken;
    });

    it('Tenta deletar registro existente', async () => {
        const res = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Gabriel", numero: 9181717171});
        expect(res.statusCode).toBe(StatusCodes.CREATED);

        const resApagada = await testServer.delete(`/contacts/${res.body}`).send()
        .set({Authorization: `Bearer ${accessToken}`});
        expect(resApagada.statusCode).toBe(StatusCodes.NO_CONTENT);
    }),
    it('Tenta deletar registro, sem o token de acesso', async () => {
        const res = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Gabriel", numero: 9181717171});
        expect(res.statusCode).toBe(StatusCodes.CREATED);

        const resApagada = await testServer.delete(`/contacts/${res.body}`).send();
        expect(resApagada.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    }),
    it('Tenta deletar registo inexistente', async () => {
        const resApagada = await testServer.delete('/contacts/999').send()
        .set({Authorization: `Bearer ${accessToken}`});
        expect(resApagada.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resApagada.body).toHaveProperty('errors.default');
    })
})

