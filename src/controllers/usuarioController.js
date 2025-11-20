const usuarioService = require('../services/usuarioService');
const { validationResult } = require('express-validator');

exports.buscarTodosUsuario = async (req, res) => {
    try {
        const usuarios = await usuarioService.buscarTodosUsuario();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
};

exports.buscarUsuarioPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.buscarUsuarioPorId(id);
        return res.status(200).json(usuario);
    } catch (error) {
        next(error); 
    }
};

exports.updateUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const novosDados = req.body;
        
        if (req.usuario.id !== parseInt(id)) {
            const error = new Error('Não autorizado. Você só pode atualizar seu próprio perfil.');
            error.statusCode = 403;
            throw error;
        }

        const usuarioAtualizado = await usuarioService.updateUsuario(id, novosDados);
        return res.status(200).json({ 
            mensagem: 'Usuário atualizado com sucesso!',
            usuario: usuarioAtualizado 
        });
    } catch (error) {
        next(error);
    }
};


exports.deleteUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (req.usuario.id !== parseInt(id)) {
            const error = new Error('Não autorizado. Você só pode deletar sua própria conta.');
            error.statusCode = 403;
            throw error;
        }

        await usuarioService.deleteUsuario(id);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};