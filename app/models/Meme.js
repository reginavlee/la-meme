const Sequelize = require('sequelize');
const db = require('../db/db');

const Memes = db.define('Memes', {
  href: Sequelize.STRING
});
Memes.sync();

module.exports = Memes;

