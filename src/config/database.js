const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fasthealth', 'root', 'agua3006', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
