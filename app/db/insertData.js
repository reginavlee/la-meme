// seed file

// var app = require('../../server.js');
const db = require('./db.js');
const memeData = require('../../data/memephotos.json');
const roomData = require('../../data/rooms.json')
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

insertPhotos();
insertRooms();


// to insert a single photo into the database (from the memephotos.json file)

/**
Meme.create({
  href: data[2].href
}).then((obj) => {
  obj.save();
}).catch((err) => {
  console.log(err);
});
**/

// module.exports = db.Meme;
