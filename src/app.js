const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Middlewares globais
app.use(cors()); 
app.use(express.json()); 

// Rota de teste
app.get('/', (req, res) => {
    res.status(200).json({ mensagem: 'API de Filmes base pronta para rotas!' });
});

//Conexão das rotas
app.use('/api/v1/usuarios', authRoutes);

// Middleware global de tratamento de erros
app.use(errorMiddleware);

module.exports = app;