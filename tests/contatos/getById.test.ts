import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Contatos - getById', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'contato@gmail.com';
        await testServer.post('/signup').send({nome: 'contato', email, senha: 'cont1234'});
        const signinRes = await testServer.post('/signin').send({email, senha: 'cont1234'});
        accessToken = signinRes.body.accessToken;
    });
    
    it('Tenta buscar registo com o id válido', async () => {
        const res = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({ nome: 'Gabriel', numero: 9181917171});
        expect(res.statusCode).toBe(StatusCodes.CREATED);

        const registroBuscado = await testServer.get(`/contacts/${res.body}`)
        .set({Authorization: `Bearer ${accessToken}`})
        .send()
        expect(registroBuscado.statusCode).toBe(StatusCodes.OK);
        expect(registroBuscado.body).toHaveProperty('id');
    }),
    it('Tenta buscar registro que não existe', async () => {
        const registroBuscado = await testServer.get('/contacts/999')
        .set({Authorization: `Bearer ${accessToken}`})
        .send();
        expect(registroBuscado.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(registroBuscado.body).toHaveProperty('errors.default');
    }),
    it('Tenta buscar registro em estar com o token de acess', async () => {
        const res = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({ nome: 'Gabriel', numero: 9181917171});
        expect(res.statusCode).toBe(StatusCodes.CREATED);

        const registroBuscado = await testServer.get(`/contacts/${res.body}`)
        .send()
        expect(registroBuscado.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        expect(registroBuscado.body).toHaveProperty('errors.default');
    })
    it('Tenta buscar registro com id que não seja maior que 0', async () => {
        const registroBuscado = await testServer.get('/contacts/-1')
        .set({Authorization: `Bearer ${accessToken}`})
        .send();
        expect(registroBuscado.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(registroBuscado.body).toHaveProperty('errors.params');
    })
})

