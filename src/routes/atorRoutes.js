const express = require('express');
const router = express.Router();
const atorController = require('../controllers/atorController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const validacoesAtor = [
    body('nome').notEmpty().withMessage('O nome é obrigatório.'),
    body('data_nascimento').isDate().withMessage('A data de nascimento deve ser uma data válida (AAAA-MM-DD).'),
];

// Rotas Públicas
router.get('/', atorController.buscarTodos); 
router.get('/:id', atorController.buscarPorId); 

// Rotas Protegidas
router.post('/', authMiddleware, validacoesAtor, atorController.criarAtor);
router.put('/:id', authMiddleware, validacoesAtor, atorController.atualizarAtor);
router.delete('/:id', authMiddleware, atorController.deletarAtor); 

module.exports = router;