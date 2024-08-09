require('dotenv').config();

const Sequelize = require('sequelize');

const {
  DB_NAME = 'techblog_db',
  DB_USER = 'postgres',
  DB_PASSWORD = 'Bzavion18#',
  DB_URL
} = process.env;

const sequelize = DB_URL
  ? new Sequelize(DB_URL)
  : new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;