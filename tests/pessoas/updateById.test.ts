import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Pessoas - updateById', () => {
    let contatoId: number | undefined;
    beforeAll(async () =>{
        const resContato = await testServer.post('/contacts')
        .send({nome: "Gabriel", numero: "879202846"});
        contatoId = resContato.body;
    });
    it('Atualiza registro', async () => {
        const response = await testServer.post('/peoples')
        .send({nomeCompleto: "Samara", email: "samara@gmail.com", contatoId})
        expect(response.statusCode).toBe(StatusCodes.CREATED);

        const registroAtualizado = await testServer.put(`/peoples/${response.body}`)
        .send({nomeCompleto: "Laura", email: "laura@gmail.com", contatoId});
        expect(registroAtualizado.statusCode).toBe(StatusCodes.NO_CONTENT);
    }),
    it('Tenta atualizar registro que não existe', async () => {
        const registroAtualizado = await testServer.put(`/peoples/999`)
        .send({nomeCompleto: "Laura", email: "laura@gmail.com", contatoId});
        expect(registroAtualizado.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(registroAtualizado.body).toHaveProperty('errors.default');
    })
})

