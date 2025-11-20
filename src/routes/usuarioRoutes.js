const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas Administrativas (Todas exigem Autenticação)
router.get('/', authMiddleware, usuarioController.buscarTodosUsuario); // GET /api/v1/usuarios
router.get('/:id', authMiddleware, usuarioController.buscarUsuarioPorId); // GET /api/v1/usuarios/:id
router.put('/:id', authMiddleware, usuarioController.updateUsuario); // PUT /api/v1/usuarios/:id
router.delete('/:id', authMiddleware, usuarioController.deleteUsuario); // DELETE /api/v1/usuarios/:id

module.exports = router;