const serieService = require('../services/serieService');
const { validationResult } = require('express-validator');

exports.criarSerie = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

    try {
        const novaSerie = await serieService.criar(req.body);
        return res.status(201).json(novaSerie); 
    } catch (error) {
        next(error); 
    }
};

exports.buscarTodasSeries = async (req, res, next) => {
    try {
        const series = await serieService.buscarTodos();
        return res.status(200).json(series);
    } catch (error) {
        next(error);
    }
};

exports.buscarSeriePorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const serie = await serieService.buscarPorId(id);
        return res.status(200).json(serie);
    } catch (error) {
        next(error);
    }
};

exports.atualizarSerie = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

    try {
        const { id } = req.params;
        const serieAtualizada = await serieService.atualizar(id, req.body);
        return res.status(200).json(serieAtualizada);
    } catch (error) {
        next(error);
    }
};

exports.deletarSerie = async (req, res, next) => {
    try {
        const { id } = req.params;
        await serieService.deletar(id);
        return res.status(204).send(); 
    } catch (error) {
        next(error);
    }
};