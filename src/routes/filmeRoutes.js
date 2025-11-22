const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: Endpoints para gerenciamento de filmes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FilmeInput:
 *       type: object
 *       required:
 *         - titulo
 *         - diretor
 *         - ano_lancamento
 *       properties:
 *         titulo:
 *           type: string
 *           description: Título do filme
 *           example: "O Poderoso Chefão"
 *         diretor:
 *           type: string
 *           description: Diretor do filme
 *           example: "Francis Ford Coppola"
 *         ano_lancamento:
 *           type: integer
 *           description: Ano de lançamento
 *           example: 1972
 *     FilmeResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do filme
 *           example: 1
 *         titulo:
 *           type: string
 *           description: Título do filme
 *           example: "O Poderoso Chefão"
 *         diretor:
 *           type: string
 *           description: Diretor do filme
 *           example: "Francis Ford Coppola"
 *         ano_lancamento:
 *           type: integer
 *           description: Ano de lançamento
 *           example: 1972
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T10:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T12:00:00Z"
 */

const validacoesFilme = [
  body('titulo').notEmpty().withMessage('O título é obrigatório.'),
  body('diretor').notEmpty().withMessage('O diretor é obrigatório.'),
  body('ano_lancamento').isInt({ min: 1888, max: 2100 }).withMessage('Ano inválido.'),
];

/**
 * @swagger
 * /filmes:
 *   get:
 *     summary: Retorna todos os filmes cadastrados
 *     tags: [Filmes]
 *     responses:
 *       200:
 *         description: Lista de filmes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FilmeResponse'
 */
router.get('/', filmeController.buscarTodosFilmes);

/**
 * @swagger
 * /filmes/{id}:
 *   get:
 *     summary: Busca um filme pelo ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do filme
 *     responses:
 *       200:
 *         description: Detalhes do filme
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FilmeResponse'
 *       404:
 *         description: Filme não encontrado
 */
router.get('/:id', filmeController.buscarFilmePorId);

/**
 * @swagger
 * /filmes:
 *   post:
 *     summary: Cadastra um novo filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmeInput'
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FilmeResponse'
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autorizado (Token inválido ou ausente)
 */
router.post('/', authMiddleware, validacoesFilme, filmeController.criarFilme);

/**
 * @swagger
 * /filmes/{id}:
 *   put:
 *     summary: Atualiza os dados de um filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do filme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmeInput'
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FilmeResponse'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Filme não encontrado
 */
router.put('/:id', authMiddleware, validacoesFilme, filmeController.atualizarFilme);

/**
 * @swagger
 * /filmes/{id}:
 *   delete:
 *     summary: Remove um filme
 *     tags: [Filmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do filme
 *     responses:
 *       204:
 *         description: Filme removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Filme não encontrado
 */
router.delete('/:id', authMiddleware, filmeController.deletarFilme);

module.exports = router;