const db = require('../models');
const Usuario = db.Usuario; 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const { validationResult } = require('express-validator'); 

const JWT_SECRET = process.env.JWT_SECRET; 
const SALT_ROUNDS = 10; 

exports.registro = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { nome, email, password } = req.body;
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ error: 'Usuário já registrado com este e-mail.' });
        }
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const novoUsuario = await Usuario.create({ nome, email, password: hashedPassword });

        return res.status(201).json({ 
            mensagem: 'Usuário registrado com sucesso!',
            usuario: { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email }
        });

    } catch (error) {
        console.error("Erro no registro:", error);
        return res.status(500).json({ error: 'Erro interno do servidor durante o registro.' });
    }
};


exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const senhaCorreta = await bcrypt.compare(password, usuario.password);
        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, email: usuario.email }, 
            JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        return res.status(200).json({ 
            mensagem: 'Login realizado com sucesso!',
            token: token 
        });

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: 'Erro interno do servidor durante o login.' });
    }
};