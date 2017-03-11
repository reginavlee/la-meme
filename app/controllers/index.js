const models = require('../models/index');

module.exports = {
  users: {
    get: (req, res) => {
      res.end();
    },
    getById: (req, res) => {
      res.end();
    },
    post: (req, res) => {
      res.end();
    },
  },
  memes: {
    get: (req, res) => {
      // controller for handling a get on meme photo resource

      // use get on the models
      models.get();

      res.end();
    },
    post: (req, res) => {
      res.end();
    },
  },
  rooms: {
    get: (req, res) => {
      res.end();
    },
    getById: (req, res) => {
      res.end();
    },
    post: (req, res) => {
      res.end();
    },
  },
};
