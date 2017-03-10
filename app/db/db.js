const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/lameme';

const db = mongoose.createConnection(mongoUri);

module.exports = db;
