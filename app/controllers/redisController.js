
// const pubClient = require('../redis/redisConnect').createClient();
// const subClient = require('../redis/redisConnect').createClient();
// const roomPubClient = require('../redis/redisConnect').createClient();
// const roomSubClient = require('../redis/redisConnect').createClient();
// // init global count to 0
// pubClient.setAsync('gc', 0).then((v) => { console.log('global count initialized, ', v); });
// subClient.subscribe('global-count');
// roomSubClient.subscribe('room-count');

// const publishRoomData = function publishRoomData(socket) {
//   roomSubClient.on('message', (channel, room) => {
//     console.log('room data to send to dashboard', room);
//     socket.broadcast.emit('rooms-data', room);
//   });
// };

// const publishDashboardCount = function publishDashboardCount(socket, ioRef, username) {
//   console.log('publish dashboard called', username);
//   socket.username = username;
//   subClient.on('message', (channel, count) => {
//     // globally share count & users info to be rendered
//     pubClient.hgetallAsync(username)
//       // .then(userInfo => { ioRef.emit('connected-user', count, userInfo); })
//       .catch((err) => {
//         if (err) {
//           console.log(err);
//         }
//       });
//   });
// };

// module.exports = {
//   /**
//    * responsible for adding users to redis
//    * @param {object} user 
//    * @param {string} socketId 
//    */
//   addUser(user, socketId) {
//     const { username } = user;
//     // first lets check to see if user already exists within redis, if so we only need to update
//     // their socketId
//     pubClient.hmgetAsync(username, 'un').then((un) => {
//       if (un !== null) {
//         pubClient.hmsetAsync(username, 'sid', socketId).then((r) => {
//           console.log(r);
//           console.log('re-set socketId');
//         });
//       }
//     });

//     // if the username doesn't already exists in redis, we'll insert a new hash into redis
//     pubClient.hmsetAsync(username, 'un', username, 'sid', socketId, 'ol', '1')
//       .then(v => console.log('here', v))
//       .catch((err) => {
//         if (err) {
//           console.log(err);
//         }
//       });
//   },
//   /**
//    *
//    * @param {object} room
//    * @param {object} roomData
//    * @param {string} socket
//    */
//   addRoom(room, roomData, socket) {
//     // first check to see if room exists
//     roomPubClient.hgetallAsync(room).then((roomExists) => {
//       if (roomExists !== null) {
//         // increment room count?
//       }
//     });
//     roomPubClient.hmsetAsync(room, 'rm', room, 'rs', 0)
//       .catch((err) => {
//         if (err) throw new Error(err);
//       });
//     const callOnce = once(publishRoomData);
//     callOnce(socket);
//   },
//   /**
//    * We will use redis to store a global count of people connected to our socket.io server
//    * All of these operations are atomic, meaning they are perfect for quickly changing data
//    */
//   incrementClientCount(socket, ioRef, username) {
//     pubClient.getAsync('gc')
//     .then((gc) => {
//       if (Number(gc) >= 0) {
//         pubClient.incrAsync('gc')
//         .then(globalCount => pubClient.publish('global-count', globalCount))
//         .catch((err) => {
//           if (err) console.log('problem publishing global count');
//         });
//       }
//     })
//     .catch((err) => {
//       if (err) console.log(err);
//     });
//     publishDashboardCount(socket, ioRef, username);
//   },
//   decrementClientCount(socket, ioRef, username) {
//     console.log(username);
//     console.log(socket.username);
//     console.log('user disconnected');
//     pubClient.hset(socket.username, 'ol', '0');

//     pubClient.getAsync('gc')
//     .then((gc) => {
//       if (Number(gc) > 0) {
//         pubClient.decrAsync('gc')
//           .then(globalCount => pubClient.publish('global-count', globalCount))
//           .catch((err) => {
//             if (err) {
//               console.log('problem publishing global count', err);
//             }
//           });
//       }
//     })
//     .catch((err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   },
//   updateRoomCount(room, totalCount, socket) {
//     console.log('from inside updateRoomCount: ', room, totalCount);
//     pubClient.hmsetAsync(room, 'rm', room, 'rs', totalCount)
//       .catch((err) => {
//         if (err) throw new Error(err);
//       });
//     pubClient.hgetallAsync(room)
//       .then((updatedRoom) => {
//         pubClient.publish('room-count', JSON.stringify(updatedRoom));
//       })
//       .catch(err => console.log(err));
//   },
// };
