module.exports = (sequelize, DataTypes) => {
    const Serie = sequelize.define('Serie', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        num_temporadas: {
            type: DataTypes.INTEGER
        },
    }, {
        tableName: 'series'
    });

    return Serie;
};