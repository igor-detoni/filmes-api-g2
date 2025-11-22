const express = require('express');
const router = express.Router();
const atorController = require('../controllers/atorController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Atores
 *   description: Endpoints para gerenciamento de atores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AtorInput:
 *       type: object
 *       required:
 *         - nome
 *         - data_nascimento
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do ator
 *           example: "Tom Hanks"
 *         data_nascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento (AAAA-MM-DD)
 *           example: "1956-07-09"
 *     AtorResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do ator
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome do ator
 *           example: "Tom Hanks"
 *         data_nascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento
 *           example: "1956-07-09"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const validacoesAtor = [
    body('nome').notEmpty().withMessage('O nome é obrigatório.'),
    body('data_nascimento').isDate().withMessage('A data de nascimento deve ser uma data válida (AAAA-MM-DD).'),
];

/**
 * @swagger
 * /atores:
 *   get:
 *     summary: Retorna todos os atores cadastrados
 *     tags: [Atores]
 *     responses:
 *       200:
 *         description: Lista de atores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AtorResponse'
 */
router.get('/', atorController.buscarTodos);

/**
 * @swagger
 * /atores/{id}:
 *   get:
 *     summary: Busca um ator pelo ID
 *     tags: [Atores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do ator
 *     responses:
 *       200:
 *         description: Detalhes do ator
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AtorResponse'
 *       404:
 *         description: Ator não encontrado
 */
router.get('/:id', atorController.buscarPorId);

/**
 * @swagger
 * /atores:
 *   post:
 *     summary: Cadastra um novo ator (Protegido)
 *     tags: [Atores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtorInput'
 *     responses:
 *       201:
 *         description: Ator criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AtorResponse'
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, validacoesAtor, atorController.criarAtor);

/**
 * @swagger
 * /atores/{id}:
 *   put:
 *     summary: Atualiza os dados de um ator (Protegido)
 *     tags: [Atores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do ator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtorInput'
 *     responses:
 *       200:
 *         description: Ator atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AtorResponse'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Ator não encontrado
 */
router.put('/:id', authMiddleware, validacoesAtor, atorController.atualizarAtor);

/**
 * @swagger
 * /atores/{id}:
 *   delete:
 *     summary: Remove um ator (Protegido)
 *     tags: [Atores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do ator
 *     responses:
 *       204:
 *         description: Ator removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Ator não encontrado
 */
router.delete('/:id', authMiddleware, atorController.deletarAtor);

module.exports = router;