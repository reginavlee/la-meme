const Sequelize = require('sequelize');

const db = new Sequelize('lameme', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
});

module.exports = db;
