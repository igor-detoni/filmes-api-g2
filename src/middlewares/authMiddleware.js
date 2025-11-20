const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ 
            error: 'Acesso negado. Token não fornecido.' 
        });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ 
            error: 'Acesso negado. Formato de token inválido.' 
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.usuario = decoded; 

        return next(); 

    } catch (error) {
        return res.status(401).json({ 
            error: 'Token inválido ou expirado.' 
        });
    }
};