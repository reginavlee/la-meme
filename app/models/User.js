const Sequelize = require('sequelize');
const db = require('../db/db');

const Users = db.define('Users', {
  auth0Id: Sequelize.STRING,
  topScore: Sequelize.NUMBER,
  name: Sequelize.STRING
});
Users.sync();

module.exports = Users;
