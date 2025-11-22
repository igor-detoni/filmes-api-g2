const avaliacaoRepository = require('../repositories/avaliacaoRepository');
const db = require('../models');
const Avaliacao = db.Avaliacao;

class AvaliacaoService {
    async criar(dados) {
        return avaliacaoRepository.create(dados);
    }

    async buscarTodos() {
        return avaliacaoRepository.buscarTodos();
    }

    async atualizar(id, dados, usuarioId) {
        const avaliacao = await Avaliacao.findByPk(id);
        
        if (!avaliacao) {
            const error = new Error('Avaliação não encontrada.');
            error.statusCode = 404;
            throw error;
        }

        if (avaliacao.usuarioId !== usuarioId) {
            const error = new Error('Acesso negado. Você só pode atualizar suas próprias avaliações.');
            error.statusCode = 403;
            throw error;
        }

        const [linhasAfetadas] = await avaliacaoRepository.update(id, dados);

        if (linhasAfetadas === 0) {
            throw new Error('Nenhum dado novo para atualizar.');
        }

        return avaliacaoRepository.buscarPorId(id);
    }

    async deletar(id) {
        const linhasDeletadas = await avaliacaoRepository.delete(id);
        if (linhasDeletadas === 0) {
            const error = new Error('Avaliação não encontrada.');
            error.statusCode = 404;
            throw error;
        }
        return true;
    }
}

module.exports = new AvaliacaoService();