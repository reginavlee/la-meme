const Promise = require('bluebird');
const client = Promise.promisifyAll(require('../redis/redisConnect'));

module.exports = {
  addRoom(room, { playerCount }) {
    console.log(room);
    client.hmsetAsync(JSON.stringify(room), 'rm', room, 'rs', playerCount).then( (v) => {
      console.log(v);
      client.hgetallAsync(JSON.stringify(room)).then((v) => { console.log(v) });
    });

  }
};
