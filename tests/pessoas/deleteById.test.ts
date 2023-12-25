import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Pessoas - deleteById', () => {
    let contatoId: number | undefined;
    beforeAll(async () => {
        const resContato = await testServer.post('/contacts')
        .send({nome: 'Maria', numero: '872627162'});
        contatoId = resContato.body;
        expect(resContato.statusCode).toBe(StatusCodes.CREATED);
    });

    it('Deleta registro existente na tabela', async () => {
        const response = await testServer.post('/peoples')
        .send({nomeCompleto: 'Gabriel', email: 'gabriel@gmail.com', contatoId});

        const registroDeletado = await testServer.delete(`/peoples/${response.body}`).send();
        expect(registroDeletado.statusCode).toBe(StatusCodes.NO_CONTENT);
    }),
    it('Tenta deletar registo inexistente', async () => {

        const registroDeletado = await testServer.delete('/peoples/999').send();
        expect(registroDeletado.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(registroDeletado.body).toHaveProperty('errors.default');
    })
})
