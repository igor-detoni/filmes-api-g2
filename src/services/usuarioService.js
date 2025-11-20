const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10; 

class UsuarioService {

    async buscarTodosUsuario() {
        return usuarioRepository.buscarTodos();
    }

    async buscarUsuarioPorId(id) {
        const usuario = await usuarioRepository.buscarPorId(id);
        if (!usuario) {
            const error = new Error('Usuário não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return usuario;
    }

    async updateUsuario(id, dados) {
        if (dados.password) {
            dados.password = await bcrypt.hash(dados.password, SALT_ROUNDS);
        }

        const [linhasAfetadas, usuarioAtualizado] = await usuarioRepository.update(id, dados);

        if (linhasAfetadas === 0) {
            const error = new Error('Usuário não encontrado ou nenhum dado para atualizar.');
            error.statusCode = 404;
            throw error;
        }

        return this.buscarUsuarioPorId(id);
    }

    async deleteUsuario(id) {
        const linhasDeletadas = await usuarioRepository.delete(id);

        if (linhasDeletadas === 0) {
            const error = new Error('Usuário não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return true;
    }
    
    // OBS: Os métodos de Registro e Login estão no authController para simplificação.
    // Em projetos maiores, eles estariam aqui, mas vamos manter a separação atual.
}

module.exports = new UsuarioService();