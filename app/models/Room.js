const Sequelize = require('sequelize');
const db = require('../db/db');

const Rooms = db.define('Rooms', {
  name: Sequelize.STRING,
});
Rooms.sync();

module.exports = Rooms;
