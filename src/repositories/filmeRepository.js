const db = require('../models');
const Filme = db.Filme;

class FilmeRepository {

    async buscarTodos() {
        return Filme.findAll({
            attributes: ['id', 'titulo', 'diretor', 'ano_lancamento']
        });
    }

    async buscarPorId(id) {
        return Filme.findByPk(id, {
            attributes: ['id', 'titulo', 'diretor', 'ano_lancamento']
        });
    }

    async create(dadosFilme) {
        return Filme.create(dadosFilme);
    }

    async update(id, novosDados) {
        return Filme.update(novosDados, { 
            where: { id } 
        });
    }

    async delete(id) {
        return Filme.destroy({ 
            where: { id } 
        });
    }
}

module.exports = new FilmeRepository();