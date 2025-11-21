module.exports = (sequelize, DataTypes) => {
    const Filme = sequelize.define('Filme', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        diretor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ano_lancamento: { type: DataTypes.INTEGER },
    }, { 
        tableName: 'filmes' 
    });

    return Filme;
};