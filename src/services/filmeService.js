const filmeRepository = require('../repositories/filmeRepository');

class FilmeService {

    async criar(dados) {
        return filmeRepository.create(dados);
    }

    async buscarTodos() {
        return filmeRepository.buscarTodos();
    }

    async buscarPorId(id) {
        const filme = await filmeRepository.buscarPorId(id);
        if (!filme) {
            const error = new Error('Filme não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return filme;
    }

    async atualizar(id, dados) {
        const [linhasAfetadas] = await filmeRepository.update(id, dados);

        if (linhasAfetadas === 0) {
            const error = new Error('Filme não encontrado ou nenhum dado para atualizar.');
            error.statusCode = 404;
            throw error;
        }

        return this.buscarPorId(id);
    }

    async deletar(id) {
        const linhasDeletadas = await filmeRepository.delete(id);

        if (linhasDeletadas === 0) {
            const error = new Error('Filme não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return true;
    }
}

module.exports = new FilmeService();