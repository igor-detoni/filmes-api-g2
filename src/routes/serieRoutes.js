const express = require('express');
const router = express.Router();
const serieController = require('../controllers/serieController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const validacoesSerie = [
    body('titulo').notEmpty().withMessage('O título é obrigatório.'),
    body('num_temporadas').isInt({ min: 1 }).withMessage('O número de temporadas deve ser um número inteiro positivo.'),
];

// Rotas Públicas
router.get('/', serieController.buscarTodasSeries); 
router.get('/:id', serieController.buscarSeriePorId); 

// Rotas Protegidas
router.post('/', authMiddleware, validacoesSerie, serieController.criarSerie);
router.put('/:id', authMiddleware, validacoesSerie, serieController.atualizarSerie);
router.delete('/:id', authMiddleware, serieController.deletarSerie); 

module.exports = router;