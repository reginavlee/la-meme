const User = require('./User');
const Meme = require('./Meme');
const Room = require('./Room');


module.exports = {
  users: {
    get: () => {
      // handles grabbing all users from db
    },
    getById: () => {
      // handles grabbing all users by Id from db
    },
    post: () => {
      // handles creating a new user
    },
  },
  memes: {
    get: () => {
      // handles grabbing a random meme from the database
    },
    getById: () => {
      // handles grabbing a particular meme from the database
    },
    post: () => {
      // handles creating a meme (MVP+ Feature)
    },
  },
  rooms: {
    get: () => {
      // handles getting all rooms from the database
    },
    getById: () => {
      // handles getting a particular room from the database
    },
    post: () => {
      // handles creating a room in the database
    },
  },
};
