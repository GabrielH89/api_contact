import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Contatos - Create', () => {
    it('Cria registro', async () => {
        const res = await testServer.post('/contacts')
        .send({nome: "Gabriel", numero: 8191819117});
        expect(res.statusCode).toBe(StatusCodes.CREATED);
    }),
    it('Tenta criar registro com nome menor que 3 caracteres', async () => {
        const res = await testServer.post('/contacts')
        .send({nome: "Ga", numero: 91819181898});
        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    }),
    it('Tenta criar registro com numero menor que 9 dígitos', async () => {
        const res = await testServer.post('/contacts')
        .send({nome: "Gabriel", numero: 91192});
        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.numero');
    }),
    it('Tenta criar registro com nome e numero possuindo caracteres insuficientes', async () => {
        const res = await testServer.post('/contacts')
        .send({nome: "Ga", numero: 91192});
        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
        expect(res.body).toHaveProperty('errors.body.numero');
    }),
    it('Tenta criar registro sem o campo nome', async () => {
        const res = await testServer.post('/contacts')
        .send({numero: 9119987662});
        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    }),
    it('Tenta criar registro sem o campo numero', async () => {
        const res = await testServer.post('/contacts')
        .send({nome: "Gabriel"});
        expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.numero');
    })
})
