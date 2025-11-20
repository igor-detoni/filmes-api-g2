module.exports = (err, req, res, next) => {
    console.error('ERRO GLOBAL:', err.stack); 

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Ocorreu um erro interno no servidor.'
    });
};