const Sequelize = require('sequelize');
const db = require('../db/db');
// const db = new Sequelize('postgres://nulqrvnq:jZF31njlNhHIp8OZXHqTjJtfvVk4t1Md@stampy.db.elephantsql.com:5432/nulqrvnq');

// defining schemas
const Rooms = db.define('Rooms', {
  name: Sequelize.STRING(),
});

const Users = db.define('Users', {
  auth0Id: Sequelize.STRING(),
  topScore: Sequelize.INTEGER(),
  name: Sequelize.STRING()
});

const UsersRooms = db.define('UsersRooms');
// {
  // userID: {
  //   type: Sequelize.INTEGER(),        
  //   model: Users,
  //   key: 'id'
  // },
  // roomID: {
  //   type: Sequelize.INTEGER(),        
  //   model: Rooms,
  //   key: 'id'
  // },
// }
// );

const User_Room_Scores = db.define('User_Room_Scores', {
  // userID: {
  //   type: Sequelize.INTEGER(),    
  //   model: Users,
  //   key: 'id'
  // },
  // roomID: {
  //   type: Sequelize.INTEGER(),    
  //   model: Rooms,
  //   key: 'id'
  // },
  roomScore: Sequelize.INTEGER()
})

const Memes = db.define('Memes', {
  href: Sequelize.STRING()
});

const Meme_Captions = db.define('Meme_Captions', {
  text: Sequelize.STRING(),
  memeID: {
    type: Sequelize.INTEGER(),
    model: Memes,
    key: 'id'
  }
});


// // schema relationships
Users.belongsToMany(Rooms, {through: 'UsersRooms'});
Rooms.belongsToMany(Users, {through: 'UsersRooms'});

Users.sync()
  .then((result) => {
    console.log('Users synced')
  }, (err) => {
    console.log('An error occured while creating the Users table:', err)
  });
Rooms.sync()
  .then((result) => {
    console.log('Rooms synced')
  }, (err) => {
    console.log('An error occured while creating the Rooms table:', err)
  });
User_Room_Scores.sync()
  .then((result) => {
    console.log('User_Room_Scores synced')
  }, (err) => {
    console.log('An error occured while creating the User_Room_Scores table:', err)
  });
Meme_Captions.sync()
  .then((result) => {
    console.log('Meme_Captions synced')
  }, (err) => {
    console.log('An error occured while creating the Meme_Captions table:', err)
  });
Memes.sync()
  .then((result) => {
    console.log('Memes synced')
  }, (err) => {
    console.log('An error occured while creating the Memes table:', err)
  });
UsersRooms.sync()
  .then((result) => {
    console.log('UsersRooms synced')
  }, (err) => {
    console.log('An error occured while creating the UsersRooms table:', err)
  });

// Users.sync();
// Rooms.sync();
// User_Room_Scores.sync();
// Memes.sync();
// Meme_Captions.sync();



// db.authenticate()
//   .then(() => {
//     console.log('Successful Connection to the database');
//   })
//   .catch((err) => {
//     console.log('Cannot connect to the database due to:', err);
//   });

module.exports = {
  Rooms,
  Users,
  User_Room_Scores,
  Meme_Captions,
  Memes
}
