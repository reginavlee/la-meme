const Sequelize = require('sequelize');
// const User = require('../models/User');
// const Meme = require('../models/Meme');
// const Room = require('../models/Room');

const db = new Sequelize('postgres://avehvksm:BsxxRvnB0sMhTN48xMclrogYVhcmLlxY@stampy.db.elephantsql.com:5432/avehvksm');


const Meme = db.define('Memes', {
  href: { type: Sequelize.STRING }
});

const User = db.define('User', {
  auth0Id: Sequelize.STRING,
});

const Room = db.define('Room', {
  roomName: Sequelize.STRING,
  clients: Sequelize.STRING,
});

User.sync();
Meme.sync();
Room.sync();

db.authenticate()
    .then(() => {
      console.log('Successful Connection to the database');
    })
    .catch((err) => {
      console.log('Cannot connect to the database due to:', err);
    });

module.exports = {
  db: db,
  Meme: Meme,
  User: User,
  Room: Room
};

