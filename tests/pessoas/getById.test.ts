import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Pessoas - getById', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'contato@gmail.com';
        await testServer.post('/signup').send({nome: 'contato', email, senha: 'cont1234'});
        const signinRes = await testServer.post('/signin').send({email, senha: 'cont1234'});
        accessToken = signinRes.body.accessToken;
    });

    let contatoId: number | undefined;
    beforeAll(async () => {
        const resContato = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: "Maria", numero: '899762726'});
        contatoId = resContato.body;
    });

    it('Busca o registro pelo id', async () => {
        const response = await testServer.post('/peoples')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nomeCompleto: 'Gabriel', email: 'gabriel@gmail.com', contatoId});
        expect(response.statusCode).toBe(StatusCodes.CREATED);

       const registroBuscado = await testServer.get(`/peoples/${response.body}`)
       .set({Authorization: `Bearer ${accessToken}`})
       .send()
       expect(registroBuscado.statusCode).toBe(StatusCodes.OK);
    }),
    it('Busca o registro pelo id, mas sem o token de acesso', async () => {
        const response = await testServer.post('/peoples')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nomeCompleto: 'Maria', email: 'maria@gmail.com', contatoId});
        expect(response.statusCode).toBe(StatusCodes.CREATED);

       const registroBuscado = await testServer.get(`/peoples/${response.body}`)
       .send()
       expect(registroBuscado.statusCode).toBe(StatusCodes.UNAUTHORIZED);
       expect(registroBuscado.body).toHaveProperty('errors.default');
    }),
    it('Tenta buscar registro que não existe', async () => {
        const registroBuscado = await testServer.get('/contacts/999')
        .set({Authorization: `Bearer ${accessToken}`})
        .send();
        expect(registroBuscado.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(registroBuscado.body).toHaveProperty('errors.default');
    }),
    it('Tenta buscar registro com id que não seja maior que 0', async () => {
        const registroBuscado = await testServer.get('/peoples/-1')
        .set({Authorization: `Bearer ${accessToken}`})
        .send();
        expect(registroBuscado.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(registroBuscado.body).toHaveProperty('errors.params');
    })
})

