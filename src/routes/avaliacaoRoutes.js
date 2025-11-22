// src/routes/avaliacaoRoutes.js
const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const validacoesAvaliacao = [
    body('nota').isFloat({ min: 0, max: 5 }).withMessage('A nota deve ser entre 0 e 5.'),
    body('comentario').optional().isString(),
    body().custom((body) => {
        if (!body.filmeId && !body.serieId) {
            throw new Error('É necessário informar o filmeId ou serieId para avaliar.');
        }
        return true;
    })
];

router.get('/', avaliacaoController.buscarTodasAvaliacoes);

//Rotas Protegidas
router.post('/', authMiddleware, validacoesAvaliacao, avaliacaoController.criarAvaliacao);
router.put('/:id', authMiddleware, validacoesAvaliacao, avaliacaoController.atualizarAvaliacao);
router.delete('/:id', authMiddleware, avaliacaoController.deletarAvaliacao);

module.exports = router;