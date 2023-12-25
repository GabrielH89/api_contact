import { testServer }from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Pessoas - getAll', () => {
    let contatoId: number | undefined;
    beforeAll(async () => {
        const resContato = await testServer.post('/contacts')
        .send({nome: "Maria", numero: '899762726'});
        contatoId = resContato.body;
    })

    it('Busca os registro do banco', async () => {
        const response = await testServer.post('/peoples')
        .send({nomeCompleto: 'Gabriel', email: 'gabriel@gmail.com', contatoId});
        expect(response.statusCode).toBe(StatusCodes.CREATED);

        const registrosBuscados = await testServer.get('/peoples')
        .send();
        expect(registrosBuscados.statusCode).toBe(StatusCodes.OK);
    })
})

