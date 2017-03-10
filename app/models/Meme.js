const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const connection = require('../db/db');

//init auto-increment connection
autoIncrement.initialize(connection);

const memeSchema = new Schema({
  href: { type: String, required: true }
}, { versionKey: false });

memeSchema.plugin(autoIncrement.plugin, 'Meme');

const Meme = connection.model('Meme', memeSchema);

module.exports = memeSchema;