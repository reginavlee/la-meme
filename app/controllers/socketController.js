//  const userIds = new Map();
//  const currentUserId = 0;

module.exports = {
  init: (io) => {
      // initialize socket.io connections here
    io.on('connection', (socket) => {
      console.log('connected', socket.id);

      socket.on('disconnect', () => {
        console.log('a user disconnected');
      });

      socket.on('chat message', (msg) => {
        console.log('message from client: ', msg);
      });

      socket.on('newRoom', (room) => {
        console.log(room);
      });
    });
  },
  joinRoom: (req, res) => {
    // logic to setup two users in a new room here
    console.log('here');
    res.end();
  },
};
