// var app = require('../../server.js');
const db = require('./db.js');
const data = require('../../data/memephotos.json');

let i;

const insertPhotos = () => {
  // could change "data.length" to 12 to only include HR photos
  for (i = 0; i < data.length; i += 1) {
    db.Meme.create({
      href: data[i].href
    }).then((obj) => {
      obj.save();
    }).catch((err) => {
      console.log(err);
    });
    console.log(data[0]);
  }
};

insertPhotos();

module.exports = db.Meme;
