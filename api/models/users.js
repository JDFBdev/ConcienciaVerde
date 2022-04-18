const { DataTypes } = require('sequelize');
const db = require('../db');

const Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kg: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Users.sync({ force: false });

module.exports = Users;