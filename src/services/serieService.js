const serieRepository = require('../repositories/serieRepository');

class SerieService {
    async criar(dados) {
        return serieRepository.create(dados);
    }

    async buscarTodos() {
        return serieRepository.buscarTodos();
    }

    async buscarPorId(id) {
        const serie = await serieRepository.buscarPorId(id);
        if (!serie) {
            const error = new Error('Série não encontrada.');
            error.statusCode = 404;
            throw error;
        }
        return serie;
    }

    async atualizar(id, dados) {
        const [linhasAfetadas] = await serieRepository.update(id, dados);

        if (linhasAfetadas === 0) {
            const error = new Error('Série não encontrada ou nenhum dado para atualizar.');
            error.statusCode = 404;
            throw error;
        }

        return this.buscarPorId(id);
    }

    async deletar(id) {
        const linhasDeletadas = await serieRepository.delete(id);

        if (linhasDeletadas === 0) {
            const error = new Error('Série não encontrada.');
            error.statusCode = 404;
            throw error;
        }
        return true;
    }
}

module.exports = new SerieService();