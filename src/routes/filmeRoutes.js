const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const validacoesFilme = [
    body('titulo').notEmpty().withMessage('O título é obrigatório.'),
    body('diretor').notEmpty().withMessage('O diretor é obrigatório.'),
    body('ano_lancamento').isInt({ min: 1888, max: 2100 }).withMessage('Ano inválido.'),
];

// Rotas Públicas
router.get('/', filmeController.buscarTodosFilmes); // GET /api/v1/filmes
router.get('/:id', filmeController.buscarFilmePorId); // GET /api/v1/filmes/:id

// Rotas Protegidas
router.post('/', authMiddleware, validacoesFilme, filmeController.criarFilme); // POST /api/v1/filmes
router.put('/:id', authMiddleware, validacoesFilme, filmeController.atualizarFilme); // PUT /api/v1/filmes/:id
router.delete('/:id', authMiddleware, filmeController.deletarFilme); // DELETE /api/v1/filmes/:id

module.exports = router;