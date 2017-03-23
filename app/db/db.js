const Sequelize = require('sequelize');

// insert your url below based on how your connecting to postgres //
const db = new Sequelize('postgres://nulqrvnq:jZF31njlNhHIp8OZXHqTjJtfvVk4t1Md@stampy.db.elephantsql.com:5432/nulqrvnq');

db.authenticate()
  .then(() => {
    console.log('Successful Connection to the database');
  })
  .catch((err) => {
    console.log('Cannot connect to the database due to:', err);
  });

module.exports = db;

