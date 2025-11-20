const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');


const validacoesRegistro = [
    body('nome').notEmpty().withMessage('O nome é obrigatório.'),
    body('email').isEmail().withMessage('E-mail inválido.'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
];

const validacoesLogin = [
    body('email').isEmail().withMessage('E-mail inválido.'),
    body('password').notEmpty().withMessage('A senha é obrigatória.'),
];


// POST /api/v1/usuarios/registro
router.post('/registro', validacoesRegistro, authController.registro);

// POST /api/v1/usuarios/login
router.post('/login', validacoesLogin, authController.login);

// GET /api/v1/usuarios/perfil
router.get('/perfil', authMiddleware, (req, res) => {
    res.status(200).json({ 
        mensagem: 'Acesso concedido. Seu perfil (dados extraídos do Token):',
        usuario: { 
            id: req.usuario.id,
            nome: req.usuario.nome,
            email: req.usuario.email 
        } 
    });
});


module.exports = router;