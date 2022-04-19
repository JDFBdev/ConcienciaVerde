const { DataTypes } = require('sequelize');
const db = require('../db');

const Users = db.define('days', {
  users: {
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
    type: DataTypes.STRING,
    allowNull: false
  }
})

Users.sync({ force: false });

module.exports = Users;