const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Avaliações
 *   description: Endpoints para gerenciamento de notas e comentários (Reviews)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AvaliacaoInput:
 *       type: object
 *       required:
 *         - nota
 *       properties:
 *         nota:
 *           type: number
 *           format: float
 *           description: Nota atribuída (entre 0 e 5)
 *           example: 4.5
 *         comentario:
 *           type: string
 *           description: Comentário opcional
 *           example: "Filme excelente, muito bem dirigido."
 *         filmeId:
 *           type: integer
 *           description: ID do filme avaliado (Obrigatório se serieId for nulo)
 *           example: 1
 *         serieId:
 *           type: integer
 *           description: ID da série avaliada (Obrigatório se filmeId for nulo)
 *           example: 2
 *     AvaliacaoResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da avaliação
 *           example: 1
 *         nota:
 *           type: number
 *           format: float
 *           example: 4.5
 *         comentario:
 *           type: string
 *           example: "Filme excelente!"
 *         usuarioId:
 *           type: integer
 *           description: ID do usuário que fez a avaliação
 *           example: 10
 *         Filme:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             titulo:
 *               type: string
 *           description: Detalhes do filme (se aplicável)
 *         Serie:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             titulo:
 *               type: string
 *           description: Detalhes da série (se aplicável)
 *         createdAt:
 *           type: string
 *           format: date-time
 */

const validacoesAvaliacao = [
    body('nota').isFloat({ min: 0, max: 5 }).withMessage('A nota deve ser entre 0 e 5.'),
    body('comentario').optional().isString(),
    // Nota: O Controller já verifica se filmeId OU serieId estão presentes
];

/**
 * @swagger
 * /avaliacoes:
 *   get:
 *     summary: Lista todas as avaliações com detalhes do conteúdo e usuário
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AvaliacaoResponse'
 */
router.get('/', avaliacaoController.buscarTodasAvaliacoes);

/**
 * @swagger
 * /avaliacoes:
 *   post:
 *     summary: Cria uma nova avaliação (Protegido)
 *     description: O ID do usuário logado é inserido automaticamente pelo sistema. É necessário fornecer filmeId OU serieId.
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvaliacaoInput'
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvaliacaoResponse'
 *       401:
 *         description: Não autorizado
 *       400:
 *         description: Dados inválidos (ex nota fora do range)
 */
router.post('/', authMiddleware, validacoesAvaliacao, avaliacaoController.criarAvaliacao);

/**
 * @swagger
 * /avaliacoes/{id}:
 *   put:
 *     summary: Atualiza uma avaliação existente (Protegido, Somente o dono)
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvaliacaoInput'
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido (Usuário não é o dono da avaliação)
 *       404:
 *         description: Avaliação não encontrada
 */
router.put('/:id', authMiddleware, validacoesAvaliacao, avaliacaoController.atualizarAvaliacao);

/**
 * @swagger
 * /avaliacoes/{id}:
 *   delete:
 *     summary: Remove uma avaliação (Protegido, Somente o dono)
 *     tags: [Avaliações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da avaliação
 *     responses:
 *       204:
 *         description: Avaliação removida com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       404:
 *         description: Avaliação não encontrada
 */
router.delete('/:id', authMiddleware, avaliacaoController.deletarAvaliacao);

module.exports = router;