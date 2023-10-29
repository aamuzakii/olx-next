const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  database: 'olx',
  dialect: 'postgres',
  username: 'postgres',
  password: '123'
})