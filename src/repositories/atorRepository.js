const db = require('../models');
const Ator = db.Ator;

class AtorRepository {
    async buscarTodos() {
        return Ator.findAll({ 
            attributes: ['id', 'nome', 'data_nascimento']
        });
    }

    async buscarPorId(id) {
        return Ator.findByPk(id, {
            attributes: ['id', 'nome', 'data_nascimento']
        });
    }

    async create(dadosAtor) {
        return Ator.create(dadosAtor);
    }

    async update(id, novosDados) {
        return Ator.update(novosDados, { 
            where: { id } 
        });
    }

    async delete(id) {
        return Ator.destroy({ 
            where: { id } 
        });
    }
}

module.exports = new AtorRepository();