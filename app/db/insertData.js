// seed file

// var app = require('../../server.js');
const db = require('./db.js');
const memeData = require('../../data/memephotos.json');
const roomData = require('../../data/rooms.json');
const memeCaptionData = require('../../data/memeCaptions.json');
const userData = require('../../data/users.json');
const Models = require('../models/index');

// to insert all photos from the data/memephotos.json file into the database
const insertPhotos = () => {
  for (let i = 0; i < memeData.length; i += 1) {
    Models.Memes.create({
      href: memeData[i].href
    }).then((obj) => {
      obj.save();
    }).catch((err) => {
      console.log(err);
    });
  }
};

const insertRooms = () => {
  for (let i = 0; i < roomData.length; i += 1) {
    Models.Rooms.create({
      name: roomData[i].name
    }).then((obj) => {
      obj.save();
    }).catch((err) => {
      console.log(err);
    });
  }
};

const insertUsers = () => {
  for (let i = 0; i < userData.length; i += 1) {
    console.log('userdata', userData[i])
    Models.Users.create({
      auth0ID: userData[i].auth0ID,
      name: userData[i].name,
      topScore: userData[i].topScore
    })
    .then((obj) => {
      obj.save();
    }).catch((err) => {
      console.log(err);
    });
  }
};

const insertMemeCaptions = () => {
  for (let i = 0; i < memeCaptionData.length; i += 1) {
    Models.MemeCaptions.create({
      text: memeCaptionData[i].text,
      votes: memeCaptionData[i].votes
    }).then((obj) => {
      obj.save();
    }).catch((err) => {
      console.log(err);
    });
  }
};

insertUsers();
insertMemeCaptions();
insertPhotos();
insertRooms();

