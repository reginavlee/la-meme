
const client = require('../redis/redisConnect').createClient();
const client2 = require('../redis/redisConnect').createClient();

module.exports = {
  /**
   * We will use redis to store a global count of people connected to our socket.io server
   * All of these operations are atomic, meaning they are perfect for quickly changing data
   */
  incrementClientCount() {
    client.incrAsync('gc')
    .then((v) => {
      console.log('total online count: ', v);
      client.publish('room-count', v);
    });
    client2.on('message', (channel, count) => {
      // globally share count
      console.log('connected users: ', count);

      // later only emit this to users in dashboard?
      this.emit('connected-users', count);
    });
    client2.subscribe('room-count');
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
  publishRooms() {
  },
  publishDashboardCount() {

  }
};


