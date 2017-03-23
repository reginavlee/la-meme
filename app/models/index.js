const Sequelize = require('sequelize');
const db = require('../db/db');

// defining schemas
const Rooms = db.define('Rooms', {
  name: Sequelize.STRING(),
});

const Users = db.define('Users', {
  auth0ID: Sequelize.STRING(),
  topScore: Sequelize.INTEGER(),
  name: Sequelize.STRING()
});

const UserRoom = db.define('UserRoom', {
  score: Sequelize.INTEGER()
});

const Memes = db.define('Memes', {
  href: Sequelize.STRING()
});

const MemeCaptions = db.define('MemeCaptions', {
  text: Sequelize.STRING(),
  votes: Sequelize.INTEGER()
});

// schema relationships
Users.belongsToMany(Rooms, {through: 'UserRoom'});
Rooms.belongsToMany(Users, {through: 'UserRoom'});
Users.hasMany(MemeCaptions);
MemeCaptions.belongsTo(Users);
Memes.hasOne(MemeCaptions);
MemeCaptions.belongsTo(Memes);

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
MemeCaptions.sync()
  .then((result) => {
    console.log('MemeCaptions synced')
  }, (err) => {
    console.log('An error occured while creating the MemeCaptions table:', err)
  });
Memes.sync()
  .then((result) => {
    console.log('Memes synced')
  }, (err) => {
    console.log('An error occured while creating the Memes table:', err)
  });
UserRoom.sync()
  .then((result) => {
    console.log('UserRoom synced')
  }, (err) => {
    console.log('An error occured while creating the UserRoom table:', err)
  });

module.exports = {
  Rooms,
  Users,
  UserRoom,
  MemeCaptions,
  Memes
}
