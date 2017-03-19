const Users = new Map();
const Rooms = new Map();
const redisController = require('./redisController');

let ioRef;
let self;
module.exports = {
  init(io) {
    self = this;
    io.on('connection', (socket) => {
      ioRef = io;
      // creates a user within our map
      socket.on('create-user', this.createUser);
      // creates a room within our redis store
      socket.on('create-room', this.createRoom);
      socket.on('location:memeroom', this.joinedMemeRoom);
      socket.on('location:dashboard', this.joinedDashboard);
      socket.on('left-meme-room', this.removeUser);


      // USER INVITE SYSTEM
      socket.on('user:invite', this.handleUserInvite);
      // socket.on('left-dashboard', this.leftDashboard);
      socket.on('chat-message', this.handleMessage);
      socket.on('start-round', this.startRound);
      // redis related
      socket.on('disconnect', this.handleDisconnect);
    });
  },
  handleUserInvite(payload) {
    const { reciever, sender, roomname } = payload;
    const senderUsername = this.username;

    // this could error if you accidently try to send a request to yourself
    try {
      ioRef.sockets.connected[reciever].emit('invite', senderUsername, (answer, accept) => {
        if (Boolean(accept) === true) {
          console.log('user accepted invite', Boolean(accept));

          // move both sockets into newly created Room ~
          // emit event that redirects them to memeRoom;

          // create roomname, and sockets of user who initiated invite and
          // user who accepted invite to createRoom
          const recieverSocket = ioRef.sockets.connected[reciever];
          const sockets = [];
          sockets.push(this, recieverSocket);
          self.createRoom(roomname, sockets);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  createUser(user) {
    const { username } = user;
    // add username to this socket.connection,
    // on disconnect we can use it to identify user to remove
    this.username = username;

    // If the user already exists, lets just update their socket.id
    // else lets create a new user in our Users map
    if (Users.get(username)) {
      const userData = Users.get(username);
      userData.sid = this.id;
      Users.set(username, userData);
    } else {
      const userData = {};
      userData.sid = this.id;
      userData.location = 'dashboard';
      Users.set(username, userData);
    }
    // Lets update the global dashboard to include this user
    const userData = Users.get(username);
    ioRef.emit('connected-user', Users.size, userData, username);
    ioRef.emit('new-user', Users.size);
    // redisController.addUser(user, this.id);
  },
  createRoom(room, sockets) {
    sockets.forEach((socket) => {
      socket.join(room, (err) => {
        if (err) {
          console.log(err);
        }
        // add the room to our map of stored rooms (eventually will be a database);
        self.addRoomToMap(room, socket);
        // emit successfully join
        self.emitSuccessfulJoin(room, socket);
        // grab room so we can determine whether user is a player or spectator
        const roomData = Rooms.get(room);
        if (roomData.playerCount < 2) {
          // if room size < 2, add player as a player to our Map
          self.addPlayer(room, socket);
        } else {
          // add player as a spectator to our Map
          self.addSpectator(room, socket);
        }
        // send back new room occupancy to all clients in that particular room
        self.emitRoomOccupancy(room, socket);
      });
    });
  },
  handleDisconnect() {
    console.log(this.username);
    // delete user from Rooms on disconnect
    Rooms.delete(this.username);
  },
  removeUser(userObj) {
    const { room, connectionType, username } = userObj;
    console.log('left meme-room');
    this.leave(room, (err) => {
      if (err) {
        throw new Error(err);
      }
      // handles edge case if theres only one use in a room
      try {
        if (connectionType === 'player') {
          self.removePlayer(room, this.id);
        } else {
          self.removeSpectator(room, this.id);
        }
        self.emitRoomOccupancy(room, this);
      } catch (error) {
        console.log(`Room: ${room} is empty, will be deleted`);
        // no one else is in room, we can delete it from our Map
        Rooms.delete(room);
      }
    });
  },
  addRoomToMap(room) {
    // if room doesn't already exist, lets create one
    if (!Rooms.get(room)) {
      const roomData = {};
      roomData.players = {};
      roomData.spectators = {};
      roomData.playerCount = 0;
      roomData.spectatorCount = 0;
      roomData.active = false;
      Rooms.set(room, roomData);
      console.log(Rooms);
    }
      // redisController.addRoom(room, roomData, socket);
    // if room already exists, user can be added to it
  },
  emitSuccessfulJoin(room, socket) {
    // send back to client event to move both players to memeRoom;
    self.emitJoinRoom(room, socket);
    ioRef.to(room).emit('join', room);
  },
  emitJoinRoom(room, socket) {
    ioRef.to(room).emit('join-memeroom', 'go to memeRoom');
  },
  addPlayer(room, socket) {
    console.log('player added!');
    const roomData = Rooms.get(room);
    roomData.players[socket.id] = socket.id;
    roomData.playerCount += 1;
    socket.emit('status', 'player');
    Rooms.set(room, roomData);
  },
  removePlayer(room, socketId) {
    const roomData = Rooms.get(room);
    delete roomData.players[socketId];
    roomData.playerCount -= 1;
    Rooms.set(room, roomData);
    console.log('removed player: ', Rooms);
  },
  addSpectator(room, socket) {
    const roomData = Rooms.get(room);
    roomData.spectators[socket.id] = socket.id;
    roomData.spectatorCount += 1;
    Rooms.set(room, roomData);
    socket.emit('status', 'spectator');
    console.log('from add spectator', Rooms);
  },
  removeSpectator(room, socketId) {
    const roomData = Rooms.get(room);
    delete roomData.spectators[socket.id];
    roomData.spectatorCount -= 1;
    Rooms.set(room, roomData);
    console.log('removed spectator: ', Rooms);
  },
  emitRoomOccupancy(room, socket) {
    const roomData = Rooms.get(room);
    const payload = {
      playerCount: roomData.playerCount,
      spectatorCount: roomData.spectatorCount
    };
    console.log(Rooms);
    ioRef.to(room).emit('occupancy', payload);
    // update redis
    const totalCount = roomData.playerCount + roomData.spectatorCount;
    if (totalCount > 0) {
      // use ioRef in the future to only emit to players in dashboard/lobby area
      redisController.updateRoomCount(room, totalCount, socket);
    }
  },
  joinedMemeRoom(payload) {
    const { location, user } = payload;
    const userData = Users.get(user);
    userData.location = location;
    Users.set(user, userData);
    // update global dashboard to reflect players location
    ioRef.emit('connected-user', Users.size, userData, user);
  },
  joinedDashboard(payload) {
    const { location, user } = payload;
    const userData = Users.get(user);
    userData.location = location;
    Users.set(user, userData);
    // update global dashboard to reflect players location
    ioRef.emit('connected-user', Users.size, userData, user);
  },
  handleMessage(message) {
    const { room } = message;
    ioRef.to(room).emit('new-message', message);
  },
  handleRoundStart(room) {
    let times = 0;
    const roomData = Rooms.get(room);
    roomData.playing = false;
    if (roomData.size < 2) {
      // emit something here to client telling them not enough users
      return;
    }
    if (!roomData.playing && times < 1) {
      times += 1;
      roomData.playing = true;
      let time = 10;
      let round = 0;
      let intermission = 0;
      const countDown = setInterval(() => {
        ioRef.to(room).emit('count-down', { time, countingDown: true });
        time -= 1;
        // time elapsed lets do something
        if (time === -1) {
          if (round === 0) {
            ioRef.to(room).emit('round-over', round);
            // intermission time
            ioRef.to(room).emit('intermission');
            if (intermission === 1) {
              round += 1;
              // start round 2
              ioRef.to(room).emit('intermission-over');
              time = 10;
              console.log('round 1 intermission done, round 2 start');
              return;
            } else {
              time = 15;
              intermission += 1;
              console.log('round 1, 10 seconds over, 15 sec begin');
            }
          }
          if (round === 1) {
            ioRef.to(room).emit('round-over', round);
            if (intermission === 2) {
              round += 1;
              // start round 3
              time = 10;
              console.log('got here from round 2', round);
              ioRef.to(room).emit('intermission-over');
              return;
            } else {
              time = 15;
              intermission += 1;
              console.log('round 2, 10 seconds over, 15 sec begin');
              ioRef.to(room).emit('intermission');
            }
          }
          if (round === 2) {
            ioRef.to(room).emit('round-over', round);
            time = 15;
            if (intermission === 3) {
              round += 1;
              ioRef.to(room).emit('intermission-over');
              ioRef.to(room).emit('game-over');
              if (round === 3) {
                clearInterval(countDown);
                roomData.active = false;
              }
            } else {
              intermission += 1;
              ioRef.to(room).emit('intermission');
            }
          }
        }
      }, 1000);
    }
  },
  startRound(room) {
    const roomData = Rooms.get(room);
    if (roomData.playerCount === 2 && roomData.active === false) {
      roomData.active = true;
      Rooms.set(room, roomData);
      self.handleRoundStart(room);
    }
  }
};
