module.exports = (sequelize, DataTypes) => {
    const Avaliacao = sequelize.define('Avaliacao', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nota: {
            type: DataTypes.FLOAT,
            allowNull: false
        }, // Nota de 0.0 a 5.0
        comentario: {
            type: DataTypes.TEXT
        },
        // As chaves estrangeiras serão criadas automaticamente pelas associações
    }, {
        tableName: 'avaliacoes'
    });

    return Avaliacao;
};