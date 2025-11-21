// src/models/index.js

const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const DataTypes = require('sequelize').DataTypes;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize; 

db.Usuario = require('./usuarioModel')(sequelize, DataTypes);
db.Filme = require('./filmeModel')(sequelize, DataTypes);
db.Serie = require('./serieModel')(sequelize, DataTypes);
db.Ator = require('./atorModel')(sequelize, DataTypes);
db.Avaliacao = require('./avaliacaoModel')(sequelize, DataTypes);

//relacionamentos 
db.Usuario.hasMany(db.Avaliacao, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
db.Avaliacao.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

db.Filme.hasMany(db.Avaliacao, { foreignKey: 'filmeId', onDelete: 'CASCADE' });
db.Avaliacao.belongsTo(db.Filme, { foreignKey: 'filmeId' });

db.Serie.hasMany(db.Avaliacao, { foreignKey: 'serieId', onDelete: 'CASCADE' });
db.Avaliacao.belongsTo(db.Serie, { foreignKey: 'serieId' });

db.Filme.belongsToMany(db.Ator, { through: 'ElencoFilme', foreignKey: 'filmeId' });
db.Ator.belongsToMany(db.Filme, { through: 'ElencoFilme', foreignKey: 'atorId' });

db.Serie.belongsToMany(db.Ator, { through: 'ElencoSerie', foreignKey: 'serieId' });
db.Ator.belongsToMany(db.Serie, { through: 'ElencoSerie', foreignKey: 'atorId' });


module.exports = db;