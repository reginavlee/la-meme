const Sequelize = require('sequelize');
const db = require('../db/db');

const Meme = db.define('Meme', {
  href: Sequelize.STRING
});

module.exports = Meme;

