//var app = require('../../server.js');
const db = require('./db.js');
//const Meme = require('../models/Meme.js');
const data = require('../../data/memephotos.json');
const mysql = require('mysql');

const Sequelize = require('sequelize');

const Photo = db.define('Photo', {
  href: Sequelize.STRING
});

db.sync();

const insertPhotos = function() {
  //could change "data.length" to 12 to only include HR photos
  for (var i = 0; i < data.length; i++) {
    Photo.create({
      href: data[i].href
    }).then(function(obj){
      obj.save();
    });
  console.log(data[0]);
  }
};

insertPhotos();

module.exports = Photo;