const Sequelize = require('sequelize');
const db = require('../db/db');

const Room = db.define('Room', {
  roomName: Sequelize.STRING,
  clients: Sequelize.STRING,
});
Room.sync();

module.exports = Room;
