const Sequelize = require('sequelize');
require('dotenv').config();
const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
  } = process.env;

module.exports = new Sequelize({
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
     },
    define: {
        timestamps: false
    }
  });