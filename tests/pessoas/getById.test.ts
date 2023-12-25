import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Pessoas - getById', () => {
    let contatoId: number | undefined;
    beforeAll(async () => {
        const resContato = await testServer.post('/contacts')
        .send({nome: "Maria", numero: '899762726'});
        contatoId = resContato.body;
    });

    it('Busca o registro pelo id', async () => {
        const response = await testServer.post('/peoples')
        .send({nomeCompleto: 'Gabriel', email: 'gabriel@gmail.com', contatoId});
        expect(response.statusCode).toBe(StatusCodes.CREATED);

       const registroBuscado = await testServer.get(`/peoples/${response.body}`).send()
       expect(registroBuscado.statusCode).toBe(StatusCodes.OK);
    }),
    it('Tenta buscar registro que não existe', async () => {
        const registroBuscado = await testServer.get('/contacts/999').send();
        expect(registroBuscado.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(registroBuscado.body).toHaveProperty('errors.default');
    }),
    it('Tenta buscar registro com id que não seja maior que 0', async () => {
        const registroBuscado = await testServer.get('/peoples/-1').send();
        expect(registroBuscado.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(registroBuscado.body).toHaveProperty('errors.params');
    })
})

