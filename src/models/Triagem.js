const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Triagem = sequelize.define('Triagem', {
  dor: { type: DataTypes.STRING },
  outro: { type: DataTypes.STRING },
  tempo: { type: DataTypes.INTEGER },
  tempo2: { type: DataTypes.STRING },
  intensidade: { type: DataTypes.STRING },
  pressao: { type: DataTypes.INTEGER },
  pressao2: { type: DataTypes.INTEGER },
  Temperatura: { type: DataTypes.FLOAT },
  Hospital: { type: DataTypes.STRING },
  descricao: { type: DataTypes.STRING },
  dataAtual: { type: DataTypes.STRING },
  userId: { type: DataTypes.STRING },
  parecer: { type: DataTypes.STRING },
  status: { 
    type: DataTypes.STRING,
    defaultValue: 'pendente'},
  name: { type: DataTypes.STRING }}, {});

module.exports = Triagem;
