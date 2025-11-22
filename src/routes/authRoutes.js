const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para login e registro de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - password
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *           example: "Igor Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "igor@teste.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuário (mínimo 6 caracteres)
 *           example: "senha123"
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "igor@teste.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "senha123"
 *     AuthResponse:
 *       type: object
 *       properties:
 *         mensagem:
 *           type: string
 *           example: "Login realizado com sucesso!"
 *         token:
 *           type: string
 *           description: Token JWT para autenticação
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

const validacoesRegistro = [
    body('nome').notEmpty().withMessage('O nome é obrigatório.'),
    body('email').isEmail().withMessage('E-mail inválido.').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.')
];

const validacoesLogin = [
    body('email').isEmail().withMessage('E-mail inválido.').normalizeEmail(),
    body('password').notEmpty().withMessage('A senha é obrigatória.')
];

/**
 * @swagger
 * /auth/registro:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Erro de validação ou email já existente
 */
router.post('/registro', validacoesRegistro, authController.registro);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login e retorna o Token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', validacoesLogin, authController.login);

module.exports = router;