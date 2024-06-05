const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  hospital: { type: DataTypes.STRING },
  endereco: { type: DataTypes.STRING },
  crm: { type: DataTypes.STRING },
  cpf: { type: DataTypes.STRING },
  tipoUsuario: { type: DataTypes.STRING },
  usuarioLogado: { type: DataTypes.STRING }
}, {});

module.exports = User;
