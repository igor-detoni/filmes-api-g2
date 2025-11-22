# 🎬 API de Filmes e Séries

**Trabalho Avaliativo G2** para a disciplina de Tópicos Especiais em Tecnologias na Educação.

---

## 🎯 Objetivo do Projeto

O objetivo deste trabalho foi desenvolver uma **API RESTful completa** utilizando Node.js e Express.js, aplicando conceitos avançados de autenticação JWT, validação de dados, tratamento de erros, implementação de testes automatizados e documentação interativa com Swagger.

### Entidades Implementadas (Mínimo de 5)

O projeto possui um CRUD completo (Create, Read, Update, Delete) para todas as seguintes entidades, garantindo relacionamentos complexos entre elas:

1.  **Usuário:** Autenticação e Perfil.
2.  **Filme:** Conteúdo principal.
3.  **Série:** Conteúdo principal.
4.  **Ator:** Relacionamento Muitos-para-Muitos (M:N) com Filmes e Séries (Elenco).
5.  **Avaliação:** Relacionamento Muitos-para-Um (M:1) com Usuário e Conteúdo.

---

## ⚙️ Tecnologias Utilizadas

A API foi desenvolvida seguindo os requisitos técnicos obrigatórios do projeto:

* **Ambiente:** Node.js com Express.js e JavaScript.
* **Banco de Dados:** PostgreSQL na nuvem (utilizando **NeonDB**).
* **ORM:** **Sequelize**.
* **Segurança:** Autenticação via **JWT** e criptografia de senha via **bcrypt**.
* **Validação:** **`express-validator`**.
* **Testes Automatizados:** **Jest** e Supertest.

---

## 🚀 Como Rodar Localmente (Passo a Passo)

### 1. Clonagem e Instalação

```bash
# 1. Clonar o repositório
git clone [Link do seu repositório GitHub]
cd [nome-da-pasta-do-projeto]

# 2. Instalar as dependências do projeto
npm install
```

2. Como Configurar o Banco de Dados
Para a API funcionar, é necessário configurar as variáveis de conexão do seu banco de dados NeonDB.


Crie um arquivo na raiz do projeto chamado .env.

Insira as variáveis abaixo, substituindo [VALOR] pela sua Connection String completa do NeonDB e definindo um segredo para o JWT:

Snippet de código

# VARIÁVEIS DE AMBIENTE (.env)

# Conexão com o Banco de Dados (NeonDB/PostgreSQL)
NEON_URL="postgresql://[usuario]:[senha]@[host]/[banco]?sslmode=require"

# Segredo para assinar os Tokens JWT (pode ser qualquer string aleatória)
JWT_SECRET="SEU_SEGREDO_SUPER_SECRETO"
3. Sincronização e Inicialização
O comando abaixo irá conectar ao banco, criar as tabelas automaticamente (sincronização do Sequelize) e iniciar o servidor:

Bash

npm run dev
A API estará rodando em: http://localhost:3000

4. Como Acessar a Documentação Swagger
A documentação interativa de todos os endpoints está configurada na rota /api-docs.

Acesse no seu navegador: http://localhost:3000/api-docs

🧪 Testes Automatizados
O projeto inclui Testes de Integração e Unitários com Jest. Para executá-los (utilizando banco de dados SQLite em arquivo temporário):

Bash

npm test
☁️ Link do Deploy Funcional
A API está publicada e acessível publicamente no seguinte endereço:

🔗 Link do Deploy:
