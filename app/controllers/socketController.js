const Users = new Map();
const Rooms = new Map();

let ioRef;
let self;
module.exports = {
  init(io) {
    self = this;
    io.on('connection', (socket) => {
      ioRef = io;
      socket.on('create-user', this.createUser);
      socket.on('create-room', this.createRoom);
      socket.on('forceDisconnect', this.removeUser);
      socket.on('chat-message', this.handleMessage);
    });
  },
  createUser(user) {
    const { username, authToken } = user;
    Users.set(authToken, username);
  },
  removeUser(user) {
    const { room, authToken } = user;
    this.leave('testRoom', (err) => {
      if (err) {
        console.log(err);
      }
      // handles edge case if theres only one use in a room
      try {
        self.emitRoomOccupancy(room);
      } catch (error) {
        console.log(error);
      }

      // clean up user in the database;
      Users.delete(authToken);
      console.log(Users);
    });
  },
  createRoom(room) {
    // join client created room;
    this.join(room, (err) => {
      if (err) {
        throw new Error(err);
      }
      // emit successfully join
      self.emitSuccessfulJoin(room);
      // send back new room occupancy to all clients in a particular room
      self.emitRoomOccupancy(room);
      // add the room to our map of stored rooms (eventually will be a database);
      self.addRoomToMap(room);
    });
  },
  addRoomToMap(room) {
    Rooms.set(room, room);
  },
  emitSuccessfulJoin(room) {
    ioRef.to(room).emit('join', room);
  },
  emitRoomOccupancy(room) {
    const roomOccupacy = ioRef.sockets.adapter.rooms[room].length;
    ioRef.to(room).emit('occupancy', roomOccupacy);
  },
  handleMessage(message) {
    const { room } = message;
    ioRef.to(room).emit('new-message', message);
  }
};
