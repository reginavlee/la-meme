const Sequelize = require('sequelize');
const db = require('../db/db');

// defining schemas
const Rooms = db.define('Rooms', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
});

const Users = db.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  auth0Id: Sequelize.STRING,
  topScore: Sequelize.NUMBER,
  name: Sequelize.STRING
});

// const Users_Rooms = db.define('Users_Rooms', {
//   userID: {
//     model: Users,
//     key: 'id'
//   },
//   roomID: {
//     model: Rooms,
//     key: 'id'
//   },
// });

const User_Room_Scores = db.define('User_Room_Scores', {
  userID: {
    model: Users,
    key: 'id'
  },
  roomID: {
    model: Rooms,
    key: 'id'
  },
  roomScore: Sequelize.NUMBER
})

const Meme_Captions = db.define('Meme_Captions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: Sequelize.STRING,
  memeID: {
    model: Memes,
    key: 'id'
  }
});

const Memes = db.define('Memes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  href: Sequelize.STRING
});


// schema relationships
Users.belongsToMany(Rooms, {through:'UsersRooms'});
Rooms.belongsToMany(Users, {through: 'UsersRooms'});

Users.sync();
Rooms.sync();
User_Room_Scores.sync();
Memes.sync();
Meme_Captions.sync();

module.exports = {
  Rooms,
  Users,
  User_Room_Scores,
  Meme_Captions,
  Memes
}
