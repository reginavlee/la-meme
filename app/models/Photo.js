const Sequelize = require('sequelize');
const db = require('../db/db');

const Photo = db.define('Photo', {
  //number: Sequelize.INTEGER,   //numbered in the seed file, but seems like mysql provides nos
  href: Sequelize.STRING
});

module.exports = Photo;