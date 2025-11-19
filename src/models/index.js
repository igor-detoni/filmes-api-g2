const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const DataTypes = require('sequelize').DataTypes;
db.Usuario = require('./usuarioModel')(sequelize, DataTypes);

module.exports = db;