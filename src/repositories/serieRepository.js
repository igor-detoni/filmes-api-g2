const db = require('../models');
const Serie = db.Serie;

class SerieRepository {
    async buscarTodos() {
        return Serie.findAll({ 
            attributes: ['id', 'titulo', 'num_temporadas']
        });
    }

    async buscarPorId(id) {
        return Serie.findByPk(id, {
            attributes: ['id', 'titulo', 'num_temporadas']
        });
    }

    async create(dadosSerie) {
        return Serie.create(dadosSerie);
    }

    async update(id, novosDados) {
        return Serie.update(novosDados, { 
            where: { id } 
        });
    }

    async delete(id) {
        return Serie.destroy({ 
            where: { id } 
        });
    }
}

module.exports = new SerieRepository();