import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Contatos - updateById', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'contato@gmail.com';
        await testServer.post('/signup').send({nome: 'contato', email, senha: 'cont1234'});
        const signinRes = await testServer.post('/signin').send({email, senha: 'cont1234'});
        accessToken = signinRes.body.accessToken;
    });
    
    it('Tenta atualizar registro que existe na tabela, com os mesmos dados', async () => {
        const res = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Gabriel", numero: 918171717})
        expect(res.statusCode).toBe(StatusCodes.CREATED);

        const resAtualizado = await testServer.put(`/contacts/${res.body}`)
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Gabriel", numero: 918171717});
        expect(resAtualizado.statusCode).toBe(StatusCodes.NO_CONTENT);
    }),
    it('Tenta atualizar registro existente, mas sem o token de acesso', async () => {
        const res = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Gabriel", numero: 918171717})
        expect(res.statusCode).toBe(StatusCodes.CREATED);

        const resAtualizado = await testServer.put(`/contacts/${res.body}`)
        .send({nome: "Gabriel", numero: 918171717});
        expect(resAtualizado.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        expect(resAtualizado.body).toHaveProperty('errors.default');
    }),
    it('Tenta atualizar registro que existe na tabela, com dados diferentes dos existentes', async () => {
        const res = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Gabriel", numero: 918171717})
        expect(res.statusCode).toBe(StatusCodes.CREATED);

        const resAtualizado = await testServer.put(`/contacts/${res.body}`)
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Samara", numero: 8171816161});
        expect(resAtualizado.statusCode).toBe(StatusCodes.NO_CONTENT);
    }),
    it('Tenta atualizar registro que não existe', async () => {
        const resAtualizado = await testServer.put('/contacts/999')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Gabriel", numero: 918171717})
        expect(resAtualizado.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resAtualizado.body).toHaveProperty('errors.default');
    }),
    it('Tenta atualizar registro com nome menor que 3 digitos', async () => {
        const resAtualizado = await testServer.put('/contacts/9')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Ga", numero: 918171717})
        expect(resAtualizado.status).toBe(StatusCodes.BAD_REQUEST);
        expect(resAtualizado.body).toHaveProperty('errors.body.nome');
    }),
    it('Tenta atualizar registro com numero menor que 9 digitos', async () => {
        const resAtualizado = await testServer.put('/contacts/9')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Gabriel", numero: 9181})
        expect(resAtualizado.status).toBe(StatusCodes.BAD_REQUEST);
        expect(resAtualizado.body).toHaveProperty('errors.body.numero');
    }),
    it('Tenta atualizar registro com nome menor que 3 e numero 9 caracteres', async () => {
        const resAtualizado = await testServer.put('/contacts/9')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Ga", numero: 9181})
        expect(resAtualizado.status).toBe(StatusCodes.BAD_REQUEST);
        expect(resAtualizado.body).toHaveProperty('errors.body.nome');
        expect(resAtualizado.body).toHaveProperty('errors.body.numero');
    })
})

