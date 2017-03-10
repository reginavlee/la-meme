const memeModel = require('../models/index');
const path = require('path');

module.exports = {
  meme: {
    get: ( req, res) => {
      // controller for handling a get on meme photo resource

      //use get on the models
      memeModel.get()
    } 
  }
}