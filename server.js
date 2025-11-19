const app = require('./src/app');
const db = require('./src/models');

const PORT = process.env.PORT || 3000; 

//Conectar e sincronizar o banco
db.sequelize
    .authenticate()
    .then(() => {
        console.log("Banco encontrado e autenticado com sucesso!");

        return db.sequelize.sync({ alter: true }); 
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor Express rodando na porta ${PORT}`);
        });

    })
    .catch((error) => {
        console.error("Erro: Banco não conectado ou erro na sincronização:", error);
        process.exit(1);
    });