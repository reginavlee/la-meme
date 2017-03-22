const Sequelize = require('sequelize');
const db = require('../db/db');

const Meme_Captions = db.define('Meme_Captions', {
  text: Sequelize.STRING,
  user_id: 
});
Meme_Captions.sync();

module.exports = Meme_Captions;
