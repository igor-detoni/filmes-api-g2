const db = require('../models');
const Avaliacao = db.Avaliacao;
const Usuario = db.Usuario;
const Filme = db.Filme;
const Serie = db.Serie;

class AvaliacaoRepository {
    async buscarTodos() {
        return Avaliacao.findAll({
            include: [
                { model: Usuario, attributes: ['id', 'nome'] },
                { model: Filme, attributes: ['id', 'titulo'] },
                { model: Serie, attributes: ['id', 'titulo'] }
            ]
        });
    }

    async buscarPorId(id) {
        return Avaliacao.findByPk(id, {
            include: [
                { model: Usuario, attributes: ['id', 'nome'] }
            ]
        });
    }

    async create(dadosAvaliacao) {
        return Avaliacao.create(dadosAvaliacao);
    }

    async update(id, novosDados) {
        delete novosDados.usuarioId; 
        
        return Avaliacao.update(novosDados, { 
            where: { id } 
        });
    }

    async delete(id) {
        return Avaliacao.destroy({ where: { id } });
    }
}

module.exports = new AvaliacaoRepository();