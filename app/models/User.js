const Sequelize = require('sequelize');
const db = require('../db/db');

const User = db.define('User', {
  auth0Id: Sequelize.STRING,
});
User.sync();

module.exports = User;
