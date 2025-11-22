const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const usuarioRoutes = require('./routes/usuarioRoutes');
const filmeRoutes = require('./routes/filmeRoutes');
const serieRoutes = require('./routes/serieRoutes');

const app = express();

// Middlewares globais
app.use(cors()); 
app.use(express.json()); 

// Rota de teste
app.get('/', (req, res) => {
    res.status(200).json({ mensagem: 'API de Filmes base pronta para rotas!' });
});

//Conexão das rotas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/filmes', filmeRoutes);
app.use('/api/v1/series', serieRoutes);

// Middleware global de tratamento de erros
app.use(errorMiddleware);

module.exports = app;