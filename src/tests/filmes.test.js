const request = require('supertest');
const db = require('../models');
const app = require('../app'); 
const Usuario = db.Usuario;

let token; 
let filmeId;
const usuarioTeste = {
    nome: 'Filme Tester',
    email: 'filmetester@jest.com',
    password: 'filmeteste123' 
};
const filmeTeste = {
    titulo: 'Pulp Fiction',
    diretor: 'Quentin Tarantino',
    ano_lancamento: 1994
};

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    
    await request(app)
        .post('/api/v1/auth/registro') 
        .send(usuarioTeste)
        .expect(201);

    const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ 
            email: usuarioTeste.email, 
            password: usuarioTeste.password 
        })
        .expect(200); 

    token = response.body.token;
    
    if (!token) throw new Error("Falha catastrófica: Login retornou 200, mas sem token.");

}, 30000);

afterAll(async () => {
    await db.sequelize.close();
});

describe('Testes de CRUD da Entidade Filmes', () => {

    it('POST /api/v1/filmes deve criar um novo filme', async () => {
        const response = await request(app)
            .post('/api/v1/filmes')
            .set('Authorization', `Bearer ${token}`)
            .send(filmeTeste)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.titulo).toBe(filmeTeste.titulo);
        filmeId = response.body.id;
    });

    it('GET /api/v1/filmes deve retornar a lista de filmes', async () => {
        const response = await request(app)
            .get('/api/v1/filmes')
            .expect(200);

        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.body.some(f => f.id === filmeId)).toBe(true);
    });

    it('GET /api/v1/filmes/:id deve retornar um filme específico', async () => {
        const response = await request(app)
            .get(`/api/v1/filmes/${filmeId}`)
            .expect(200);

        expect(response.body.titulo).toBe(filmeTeste.titulo);
    });

    it('PUT /api/v1/filmes/:id deve atualizar o filme', async () => {
        const novoTitulo = 'Pulp Fiction (Edição Especial)';
        
        await request(app)
            .put(`/api/v1/filmes/${filmeId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ titulo: novoTitulo, diretor: filmeTeste.diretor, ano_lancamento: filmeTeste.ano_lancamento })
            .expect(200);
            
        const response = await request(app).get(`/api/v1/filmes/${filmeId}`);
        expect(response.body.titulo).toBe(novoTitulo);
    });
    
    it('DELETE /api/v1/filmes/:id deve remover o filme', async () => {
        await request(app)
            .delete(`/api/v1/filmes/${filmeId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);

        await request(app)
            .get(`/api/v1/filmes/${filmeId}`)
            .expect(404);
    });
    
    it('POST /api/v1/filmes deve falhar sem o Token JWT', async () => {
        await request(app)
            .post('/api/v1/filmes')
            .send(filmeTeste)
            .expect(401);
    });
});