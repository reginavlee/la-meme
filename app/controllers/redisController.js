
const pubClient = require('../redis/redisConnect').createClient();
const subClient = require('../redis/redisConnect').createClient();
const roomPubClient = require('../redis/redisConnect').createClient();
const roomSubClient = require('../redis/redisConnect').createClient();

const once = require('lodash').once;

// init global count to 0
pubClient.setAsync('gc', 0).then((v) => { console.log('global count initialized, ', v); });
subClient.subscribe('global-count');
roomSubClient.subscribe('room-count');

const publishRoomData = function publishRoomData(socket) {
  roomSubClient.on('message', (channel, room) => {
    // console.log('publishRoomData msg called');
    // console.log('room that got created:', room);
    socket.broadcast.emit('rooms-data', room);
  });
};

const publishDashboardCount = function publishDashboardCount(socket, ioRef, username) {
  socket.username = username;
  subClient.on('message', (channel, count) => {
    // globally share count & users info to be rendered
    pubClient.hgetallAsync(username)
      .then(userInfo => { ioRef.emit('connected-user', count, userInfo); console.log(userInfo);})
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  });
};

module.exports = {
  addUser(user, socketId) {
    const { username } = user;
    pubClient.hmsetAsync(username, 'un', username, 'sid', socketId, 'ol', '1')
      .then(v => console.log('here', v))
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  },
  /**
   * We will use redis to store a global count of people connected to our socket.io server
   * All of these operations are atomic, meaning they are perfect for quickly changing data
   */
  incrementClientCount(socket, ioRef, username) {
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
    publishDashboardCount(socket, ioRef, username);
  },
  decrementClientCount(socket, ioRef, username) {
    console.log(username);
    console.log(socket.username);
    console.log('user disconnected');

    // set key 'ol' to equal 0 ~ meaning offline  
    // pubClient.delAsync(socket.id)
    //   .then(v => console.log('deleted', v));
    pubClient.hset(socket.username, 'ol', '0');


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
  },
  addRoom(room, roomData, socket) {
    const stringifyRm = JSON.stringify(room);
    roomPubClient.hmsetAsync(stringifyRm, 'rm', room, 'rs', 0)
    .catch((err) => {
      if (err) throw new Error(err);
    });

    roomPubClient.hgetallAsync(stringifyRm)
      .then((createdRoom) => {
        roomPubClient.hmgetAsync(stringifyRm, 'rs')
          .then((v) => {
            let ran = false;
            if (v > 0 && !ran) {
              // console.log('here only once');
              // roomPubClient.publish('room-count', JSON.stringify(createdRoom));
              ran = true;
            }
          });
      })
      .catch(err => console.log(err));

    const callOnce = once(publishRoomData);
    callOnce(socket);
  },
  updateRoomCount(room, totalCount, socket) {
    console.log(room, totalCount);
    const stringifyRm = JSON.stringify(room);
    pubClient.hmsetAsync(stringifyRm, 'rm', room, 'rs', totalCount)
      .catch((err) => {
        if (err) throw new Error(err);
      });
    pubClient.hgetallAsync(stringifyRm)
      .then((updatedRoom) => {
        // pubClient.hmgetAsync(stringifyRm, 'rs').then(v => console.log(JSON.stringify(v)));
        // console.log('update here once');
        pubClient.publish('room-count', JSON.stringify(updatedRoom));
      })
      .catch(err => console.log(err));
  },
};


