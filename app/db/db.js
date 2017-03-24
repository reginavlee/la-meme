const Sequelize = require('sequelize');
// require('dotenv').config();

// const db = new Sequelize(`postgres://${process.env.eSQL_USERNAME}:${process.env.eSQL_PASSWORD}@${process.env.eSQL_HOSTNAME}:${process.env.eSQL_PORT}/brsfvnfk`);
// const db = new Sequelize('postgres://brsfvnfk:H5eGsiTpsSAU2vhm2ywd61-H3G9stK-U@stampy.db.elephantsql.com:5432/brsfvnfk');

const db = new Sequelize('omoemkjk', 'omoemkjk', 'en43j8Ru8XUZfV1nODMafX96IO9LMJd0', {
  host: 'stampy.db.elephantsql.com',
  dialect: 'postgres',
  pool: {
    max:1,
    min:1,
    idle:100000
  },
});


db.authenticate()
  .then(() => {
    console.log('Successful Connection to the database');
  })
  .catch((err) => {
    console.log('Cannot connect to the database due to:', err);
  });

module.exports = db;

