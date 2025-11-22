const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *           example: "Igor Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "igor@teste.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     UsuarioUpdateInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Novo nome do usuário
 *           example: "Igor Silva Atualizado"
 *         password:
 *           type: string
 *           format: password
 *           description: Nova senha (opcional)
 *           example: "novaSenha456"
 */

const validacoesAtualizacao = [
    body('nome').optional().notEmpty().withMessage('O nome não pode estar vazio.'),
    body('password').optional().isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
];

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: CRUD para gerenciamento de perfis de usuários
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários (Gerenciamento)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioResponse'
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 */
router.get('/', authMiddleware, usuarioController.buscarTodosUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca o perfil de um usuário pelo ID
 *     tags: [Usuários (Gerenciamento)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Perfil do usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponse'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', authMiddleware, usuarioController.buscarUsuarioPorId);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza o perfil do usuário
 *     tags: [Usuários (Gerenciamento)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioUpdateInput'
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioResponse'
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido (Tentativa de atualizar o perfil de outro usuário)
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', authMiddleware, validacoesAtualizacao, usuarioController.updateUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta a conta do usuário
 *     tags: [Usuários (Gerenciamento)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser deletado
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso (No Content)
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido (Tentativa de deletar a conta de outro usuário)
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', authMiddleware, usuarioController.deleteUsuario);

module.exports = router;