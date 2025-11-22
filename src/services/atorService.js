const atorRepository = require('../repositories/atorRepository');

class AtorService {
    async criar(dados) {
        return atorRepository.create(dados);
    }

    async buscarTodos() {
        return atorRepository.buscarTodos();
    }

    async buscarPorId(id) {
        const ator = await atorRepository.buscarPorId(id);
        if (!ator) {
            const error = new Error('Ator não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return ator;
    }

    async atualizar(id, dados) {
        const [linhasAfetadas] = await atorRepository.update(id, dados);

        if (linhasAfetadas === 0) {
            const error = new Error('Ator não encontrado ou nenhum dado para atualizar.');
            error.statusCode = 404;
            throw error;
        }

        return this.buscarPorId(id);
    }

    async deletar(id) {
        const linhasDeletadas = await atorRepository.delete(id);

        if (linhasDeletadas === 0) {
            const error = new Error('Ator não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return true;
    }
}

module.exports = new AtorService();