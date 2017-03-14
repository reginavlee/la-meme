
const pubClient = require('../redis/redisConnect').createClient();
const subClient = require('../redis/redisConnect').createClient();

// init global count to 0
pubClient.setAsync('gc', 0).then((v) => { console.log('global count initialized, ', v); });
subClient.subscribe('global-count');
module.exports = {
  /**
   * We will use redis to store a global count of people connected to our socket.io server
   * All of these operations are atomic, meaning they are perfect for quickly changing data
   */
  incrementClientCount(socket) {
    console.log('user connected');
    pubClient.getAsync('gc')
    .then((gc) => {
      if (Number(gc) >= 0) {
        pubClient.incrAsync('gc')
        .then(globalCount => pubClient.publish('global-count', globalCount))
        .catch((err) => {
          if (err) console.log('problem publishing global count');
        });
      }
    })
    .catch((err) => {
      if (err) console.log(err);
    });
    this.publishDashboardCount(socket);
  },
  decrementClientCount(socket) {
    console.log('user disconnected');
    pubClient.getAsync('gc')
    .then((gc) => {
      if (Number(gc) > 0) {
        pubClient.decrAsync('gc')
          .then(globalCount => pubClient.publish('global-count', globalCount))
          .catch((err) => {
            if (err) {
              console.log('problem publishing global count', err);
            }
          });
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
    this.publishDashboardCount(socket);
  },
  addRoom(room, { playerCount }) {
    const stringifyRm = JSON.stringify(room);
    pubClient.hmsetAsync(stringifyRm, 'rm', room, 'rs', playerCount)
    .catch((err) => {
      if (err) throw new Error(err);
    });

    pubClient.hgetallAsync(stringifyRm)
      .then(d => console.log(d))
      .catch(err => console.log(err));
  },
  updateRoomCount(room, totalCount) {
    console.log(room, totalCount);
    const stringifyRm = JSON.stringify(room);
    pubClient.hmsetAsync(stringifyRm, 'rm', room, 'rs', totalCount)
      .catch((err) => {
        if (err) throw new Error(err);
      });
    pubClient.hgetallAsync(stringifyRm)
      .then(d => console.log(d))
      .catch(err => console.log(err));
  },
  publishRoomData() {
  },
  publishDashboardCount(socket) {
    subClient.on('message', (channel, count) => {
      // globally share count
      // console.log('connected users: ', count);
      // later only emit this to users in dashboard?
      socket.emit('connected-users', count);
    });
  }
};


