const Users = new Map();
const Rooms = new Map();

let ioRef;
module.exports = {
  init(io) {
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
    const { authToken } = user;
    Users.delete(authToken);
  },
  createRoom(room) {
    this.join(room);
    // emit successfully join
    ioRef.to('testRoom').emit('join', 'TestRoom');
    const roomOccupacy = ioRef.sockets.adapter.rooms[room].length;
    ioRef.to(room).emit('occupacy', roomOccupacy);
  },
  emitRoomOccupancy(room) {
  },
  handleMessage(message) {
    ioRef.emit('new-message', message);
  }
};
