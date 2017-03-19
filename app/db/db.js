const Sequelize = require('sequelize');
// const User = require('../models/User');
// const Room = require('../models/Room');

// insert your url below based on how your connecting to postgres //

const db = new Sequelize('postgres://avehvksm:BsxxRvnB0sMhTN48xMclrogYVhcmLlxY@stampy.db.elephantsql.com:5432/avehvksm');

db.authenticate()
  .then(() => {
    console.log('Successful Connection to the database');
  })
  .catch((err) => {
    console.log('Cannot connect to the database due to:', err);
  });

module.exports = db;

