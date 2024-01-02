import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Pessoas - deleteById', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'contato@gmail.com';
        await testServer.post('/signup').send({nome: 'contato', email, senha: 'cont9915'});
        const signInRes = await testServer.post('/signin').send({email, senha: 'cont9915'});
        accessToken = signInRes.body.accessToken;
    });

    let contatoId: number | undefined;
    beforeAll(async () => {
        const resContato = await testServer.post('/contacts')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nome: 'Maria', numero: '872627162'});
        contatoId = resContato.body;
        expect(resContato.statusCode).toBe(StatusCodes.CREATED);
    });
    
    it('Deleta registro existente na tabela', async () => {
        const response = await testServer.post('/peoples')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nomeCompleto: 'Gabriel', email: 'gabriel@gmail.com', contatoId});
        expect(response.statusCode).toBe(StatusCodes.CREATED);
        
        const registroDeletado = await testServer.delete(`/peoples/${response.body}`)
        .set({Authorization: `Bearer ${accessToken}`})
        .send();
        expect(registroDeletado.statusCode).toBe(StatusCodes.NO_CONTENT);
    }),
    it('Deleta registro existente na tabela, sem o token de acesso', async () => {
        const response = await testServer.post('/peoples')
        .set({Authorization: `Bearer ${accessToken}`})
        .send({nomeCompleto: 'Gabriel', email: 'gabriel@gmail.com', contatoId});
        expect(response.statusCode).toBe(StatusCodes.CREATED);
        
        const registroDeletado = await testServer.delete(`/peoples/${response.body}`)
        .send();
        expect(registroDeletado.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        expect(registroDeletado.body).toHaveProperty('errors.default');
    }),
    it('Tenta deletar registo inexistente', async () => {

        const registroDeletado = await testServer.delete('/peoples/999')
        .set({Authorization: `Bearer ${accessToken}`})
        .send();
        expect(registroDeletado.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(registroDeletado.body).toHaveProperty('errors.default');
    })
})
