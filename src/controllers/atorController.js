const atorService = require('../services/atorService');
const { validationResult } = require('express-validator');

exports.criarAtor = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const novoAtor = await atorService.criar(req.body);
        return res.status(201).json(novoAtor);
    } catch (error) {
        next(error);
    }
};

exports.buscarTodos = async (req, res, next) => {
    try {
        const atores = await atorService.buscarTodos();
        return res.status(200).json(atores);
    } catch (error) {
        next(error);
    }
};

exports.buscarPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ator = await atorService.buscarPorId(id);
        return res.status(200).json(ator);
    } catch (error) {
        next(error);
    }
};

exports.atualizarAtor = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const atorAtualizado = await atorService.atualizar(id, req.body);
        return res.status(200).json(atorAtualizado);
    } catch (error) {
        next(error);
    }
};

exports.deletarAtor = async (req, res, next) => {
    try {
        const { id } = req.params;
        await atorService.deletar(id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};