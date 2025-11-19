
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares globais
app.use(cors()); 
app.use(express.json()); 

// Rota de teste
app.get('/', (req, res) => {
    res.status(200).json({ mensagem: 'API de Filmes base pronta para rotas!' });
});

module.exports = app;