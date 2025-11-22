# 🎬 API de Filmes e Séries

**Trabalho Avaliativo G2** para a disciplina de Tópicos Especiais em Tecnologias na Educação.

---

## 🎯 Objetivo do Projeto

O objetivo deste trabalho foi desenvolver uma **API RESTful completa** utilizando Node.js e Express.js, aplicando conceitos avançados de autenticação JWT, validação de dados, tratamento de erros e implementação de testes automatizados e documentação interativa com Swagger.

### Entidades Implementadas (Mínimo de 5)

O projeto possui um CRUD completo (Create, Read, Update, Delete) para todas as seguintes entidades, garantindo relacionamentos complexos entre elas:

1. **Usuário:** Autenticação e Perfil.
2. **Filme:** Conteúdo principal.
3. **Série:** Conteúdo principal.
4. **Ator:** Relacionamento Muitos-para-Muitos (M:N) com Filmes e Séries (Elenco).
5. **Avaliação:** Relacionamento Muitos-para-Um (M:1) com Usuário e Conteúdo.

---

## ⚙️ Tecnologias Utilizadas

A API foi desenvolvida seguindo os requisitos técnicos obrigatórios do projeto:

- **Ambiente:** Node.js com Express.js e JavaScript
- **Banco de Dados:** PostgreSQL na nuvem (utilizando **NeonDB**)
- **ORM:** **Sequelize**
- **Segurança:** JWT e **bcrypt**
- **Validação:** **`express-validator`**
- **Testes Automatizados:** **Jest** e Supertest

---

## 🚀 Como Rodar Localmente

### 1. Clonagem e Instalação

```bash
# 1. Clonar o repositório
git clone [Link do seu repositório GitHub]
cd [nome-da-pasta-do-projeto]

# 2. Instalar as dependências do projeto
npm install
```

### 2. Configuração do Banco de Dados

Para a API funcionar, é necessário configurar as variáveis de conexão do seu banco de dados NeonDB.

1. Crie um arquivo na raiz do projeto chamado `.env`
2. Insira as variáveis abaixo, substituindo os valores conforme sua Connection String:

```env
# VARIÁVEIS DE AMBIENTE
NEON_URL="postgresql://[usuário]:[senha]@[host]/[banco]?sslmode=require"
JWT_SECRET="SEGREDO_FORTE_PARA_ASSINATURA_JWT"
# O Jest usará o ambiente 'test' com SQLite
```

### 3. Sincronização e Inicialização

O comando `npm run dev` irá:

1. Conectar-se ao NeonDB
2. Sincronizar e criar todas as tabelas (Usuários, Filmes, Atores, Avaliações, etc.)
3. Iniciar o servidor Express

```bash
npm run dev
```

A API estará rodando em `http://localhost:3000`

### 4. Acessar a Documentação Swagger

A documentação interativa de todos os endpoints está configurada na rota `/api-docs`.

**Acesse no seu navegador:** `http://localhost:3000/api-docs`

---

## 🧪 Testes Automatizados

Para rodar os testes de Integração e Unitários, use:

```bash
npm test
```

---

## ☁️ Link do Deploy Funcional

A API está disponível e funcional na nuvem através do Render:

**🌐 API na Nuvem:** [https://trabalhog2filmes.onrender.com](https://trabalhog2filmes.onrender.com)

**📚 Documentação Swagger Online:** [https://trabalhog2filmes.onrender.com/api-docs](https://trabalhog2filmes.onrender.com/api-docs)

---

## 📝 Licença

Este projeto foi desenvolvido para fins acadêmicos.
