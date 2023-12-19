import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('getAll - Contatos', () => {
    it('Tenta buscar todos os registros do banco', async () => {
        const res = await testServer.post('/contacts')
        .send({nome: 'Gabriel', numero: 819182937});
        expect(res.statusCode).toBe(StatusCodes.CREATED);

        const registrosBuscados = await testServer.get('/contacts')
        .send();
        expect(registrosBuscados.statusCode).toBe(StatusCodes.OK);
        expect(registrosBuscados.body.length).toBeGreaterThan(0);
    })
})


