const avaliacaoService = require('../services/avaliacaoService');
const { validationResult } = require('express-validator');

exports.criarAvaliacao = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

    try {
        const dadosAvaliacao = {
            ...req.body,
            usuarioId: req.usuario.id 
        };

        const novaAvaliacao = await avaliacaoService.criar(dadosAvaliacao);
        return res.status(201).json(novaAvaliacao);
    } catch (error) {
        next(error);
    }
};

exports.buscarTodasAvaliacoes = async (req, res, next) => {
    try {
        const avaliacoes = await avaliacaoService.buscarTodos();
        return res.status(200).json(avaliacoes);
    } catch (error) {
        next(error);
    }
};

exports.atualizarAvaliacao = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id;
        const dados = req.body;
        
        const avaliacaoAtualizada = await avaliacaoService.atualizar(id, dados, usuarioId);
        
        return res.status(200).json({ 
            mensagem: 'Avaliação atualizada com sucesso!',
            avaliacao: avaliacaoAtualizada
        });

    } catch (error) {
        next(error); 
    }
};

exports.deletarAvaliacao = async (req, res, next) => {
    try {
        const { id } = req.params;
        await avaliacaoService.deletar(id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};