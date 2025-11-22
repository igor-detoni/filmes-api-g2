const request = require('supertest');
const db = require('../models');
const app = require('../app'); 

let token;
let usuarioId;
const usuarioTeste = {
    nome: 'Tester User',
    email: 'tester@jest.com',
    password: 'password123'
};

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
}, 30000);

afterAll(async () => {
    await db.sequelize.close();
}, 30000);
describe('Testes de Autenticação e Registro', () => {

    it('POST /api/v1/auth/registro deve registrar um novo usuário', async () => {
        const response = await request(app)
            .post('/api/v1/auth/registro')
            .send(usuarioTeste)
            .expect(201);

        expect(response.body).toHaveProperty('mensagem', 'Usuário registrado com sucesso!');
        expect(response.body.usuario).toHaveProperty('email', usuarioTeste.email);
        
        usuarioId = response.body.usuario.id;
    });

    it('POST /api/v1/auth/login deve autenticar e retornar um Token JWT', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({ 
                email: usuarioTeste.email, 
                password: usuarioTeste.password 
            })
            .expect(200);

        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });
    
it('GET /api/v1/usuarios deve falhar sem o token', async () => {
    await request(app)
        .get('/api/v1/usuarios')
        .expect(401);
});
});