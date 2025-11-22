const express = require('express');
const router = express.Router();
const serieController = require('../controllers/serieController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Séries
 *   description: Endpoints para gerenciamento de séries e temporadas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SerieInput:
 *       type: object
 *       required:
 *         - titulo
 *         - num_temporadas
 *       properties:
 *         titulo:
 *           type: string
 *           description: Título da série
 *           example: "Stranger Things"
 *         num_temporadas:
 *           type: integer
 *           description: Número de temporadas
 *           example: 5
 *     SerieResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da série
 *           example: 1
 *         titulo:
 *           type: string
 *           description: Título da série
 *           example: "Stranger Things"
 *         num_temporadas:
 *           type: integer
 *           description: Número de temporadas
 *           example: 5
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const validacoesSerie = [
    body('titulo').notEmpty().withMessage('O título é obrigatório.'),
    body('num_temporadas').isInt({ min: 1 }).withMessage('O número de temporadas deve ser um número inteiro positivo.'),
];

/**
 * @swagger
 * /series:
 *   get:
 *     summary: Retorna todas as séries cadastradas
 *     tags: [Séries]
 *     responses:
 *       200:
 *         description: Lista de séries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SerieResponse'
 */
router.get('/', serieController.buscarTodasSeries);

/**
 * @swagger
 * /series/{id}:
 *   get:
 *     summary: Busca uma série pelo ID
 *     tags: [Séries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da série
 *     responses:
 *       200:
 *         description: Detalhes da série
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SerieResponse'
 *       404:
 *         description: Série não encontrada
 */
router.get('/:id', serieController.buscarSeriePorId);

/**
 * @swagger
 * /series:
 *   post:
 *     summary: Cadastra uma nova série
 *     tags: [Séries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SerieInput'
 *     responses:
 *       201:
 *         description: Série criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SerieResponse'
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, validacoesSerie, serieController.criarSerie);

/**
 * @swagger
 * /series/{id}:
 *   put:
 *     summary: Atualiza os dados de uma série
 *     tags: [Séries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da série
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SerieInput'
 *     responses:
 *       200:
 *         description: Série atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SerieResponse'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Série não encontrada
 */
router.put('/:id', authMiddleware, validacoesSerie, serieController.atualizarSerie);

/**
 * @swagger
 * /series/{id}:
 *   delete:
 *     summary: Remove uma série
 *     tags: [Séries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da série
 *     responses:
 *       204:
 *         description: Série removida com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Série não encontrada
 */
router.delete('/:id', authMiddleware, serieController.deletarSerie);

module.exports = router;