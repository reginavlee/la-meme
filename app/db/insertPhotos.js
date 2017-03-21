// seed file

// var app = require('../../server.js');
const db = require('./db.js');
const data = require('../../data/memephotos.json');
const Meme = require('../models/Meme');

let i;


// to insert all photos from the data/memephotos.json file into the database
const insertPhotos = () => {
  for (i = 0; i < data.length; i += 1) {
    Meme.create({
      href: data[i].href
    }).then((obj) => {
      obj.save();
    }).catch((err) => {
      console.log(err);
    });
  }
};

insertPhotos();


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

module.exports = db.Meme;
