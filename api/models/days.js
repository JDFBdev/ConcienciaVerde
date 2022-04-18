const { DataTypes } = require('sequelize');
const db = require('../db');

const Users = db.define('days', {
  fachas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bolsas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  kg: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  }
})

module.exports = Users;