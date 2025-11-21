const filmeService = require('../services/filmeService');
const { validationResult } = require('express-validator');

exports.criarFilme = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const novoFilme = await filmeService.criar(req.body);
        return res.status(201).json(novoFilme);
    } catch (error) {
        next(error); 
    }
};

exports.buscarTodosFilmes = async (req, res, next) => {
    try {
        const filmes = await filmeService.buscarTodos();
        return res.status(200).json(filmes);
    } catch (error) {
        next(error);
    }
};

exports.buscarFilmePorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const filme = await filmeService.buscarPorId(id);
        return res.status(200).json(filme);
    } catch (error) {
        next(error);
    }
};

exports.atualizarFilme = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const filmeAtualizado = await filmeService.atualizar(id, req.body);
        return res.status(200).json(filmeAtualizado);
    } catch (error) {
        next(error);
    }
};

exports.deletarFilme = async (req, res, next) => {
    try {
        const { id } = req.params;
        await filmeService.deletar(id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};