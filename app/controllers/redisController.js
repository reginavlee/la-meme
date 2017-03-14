const Promise = require('bluebird');
const client = Promise.promisifyAll(require('../redis/redisConnect'));

module.exports = {
  /**
   * We will use redis to store a global count of people connected to our socket.io server
   * All of these operations are atomic, meaning they are perfect for quickly changing data
   */
  incrementClientCount() {
    client.incrAsync('gc').then((v) => { console.log('total online count: ', v); });
  },
  decrementClientCount() {
    client.decrAsync('gc').then((v) => { console.log('total online count: ', v); });
  },
  addRoom(room, { playerCount }) {
    const stringifyRm = JSON.stringify(room);
    client.hmsetAsync(stringifyRm, 'rm', room, 'rs', playerCount)
    .catch((err) => {
      if (err) throw new Error(err);
    });

    client.hgetallAsync(stringifyRm)
      .then(d => console.log(d))
      .catch(err => console.log(err));
  },
  updateRoomCount(room, totalCount) {
    console.log(room, totalCount);
    const stringifyRm = JSON.stringify(room);
    client.hmsetAsync(stringifyRm, 'rm', room, 'rs', totalCount)
      .catch((err) => {
        if (err) throw new Error(err);
      });

    client.hgetallAsync(stringifyRm)
      .then(d => console.log(d))
      .catch(err => console.log(err));
  },
  publishRoomCount() {

  }
};


