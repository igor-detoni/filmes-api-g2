const db = require('../models');
const Usuario = db.Usuario;

class UsuarioRepository {

    async buscarTodos() {
        return Usuario.findAll({ 
            attributes: ['id', 'nome', 'email', 'createdAt']
        });
    }

    async buscarPorId(id) {
        return Usuario.findByPk(id, {
            attributes: ['id', 'nome', 'email', 'createdAt']
        });
    }

    async create(dadosUsuario) {
        return Usuario.create(dadosUsuario);
    }

    async update(id, novosDados) {
        return Usuario.update(novosDados, { 
            where: { id } 
        });
    }

    async delete(id) {
        return Usuario.destroy({ 
            where: { id } 
        });
    }
}

module.exports = new UsuarioRepository();