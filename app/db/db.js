const Sequelize = require('sequelize');
require('dotenv').config();

const db = new Sequelize(`postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/lamemedb`, {
  dialect: 'postgres',
  protocol: 'postgres',
})

db.authenticate()
  .then(() => {
    console.log('Successful Connection to the database');
  })
  .catch((err) => {
    console.log('Cannot connect to the database due to:', err);
  });

module.exports = db;

