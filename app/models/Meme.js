const Sequelize = require('sequelize');
const db = require('../db/db');

const Meme = db.define('Meme', {
  href: Sequelize.STRING,
  text: Sequelize.STRING,
  author: Sequelize.STRING //will probably need to change this to a user id
});

module.exports = Meme;

