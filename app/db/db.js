const Sequelize = require('sequelize');
// require('dotenv').config();

// const db = new Sequelize(`postgres://${process.env.eSQL_USERNAME}:${process.env.eSQL_PASSWORD}@${process.env.eSQL_HOSTNAME}:${process.env.eSQL_PORT}/brsfvnfk`);
const db = new Sequelize('postgres://njphjcyj:hAO8_uask8-X0xPvNNmu3mc_junUSo5v@stampy.db.elephantsql.com:5432/njphjcyj')

db.authenticate()
  .then(() => {
    console.log('Successful Connection to the database');
  })
  .catch((err) => {
    console.log('Cannot connect to the database due to:', err);
  });

module.exports = db;

