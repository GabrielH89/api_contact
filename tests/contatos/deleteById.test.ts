import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Contatos - getById', () => {
    it('Tenta deletar registro existente', async () => {
        const res = await testServer.post('/contacts')
        .send({nome: "Gabriel", numero: 9181717171});
        expect(res.statusCode).toBe(StatusCodes.CREATED);

        const resApagada = await testServer.delete(`/contacts/${res.body}`).send();
        expect(resApagada.statusCode).toBe(StatusCodes.NO_CONTENT);
    }),
    it('Tenta deletar registo inexistente', async () => {

        const resApagada = await testServer.delete('/contacts/999').send();
        expect(resApagada.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resApagada.body).toHaveProperty('errors.default');
    })
})

