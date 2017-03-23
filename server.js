const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const router = require('./routes');

const socketController = require('./app/controllers/socketController');
const redisController = require('./app/controllers/redisController');

const app = express();
const port = 3000;

const db = require('./app/models/index.js')

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'client')));

app.use('/', router);

app.get('/login*', (req, res) => {
  console.log(req);
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
});


/*
 * Setup Http Server w/ express
 */
const server = http.createServer(app).listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

/*
 * Setup Socket.io & pass connection listener to socketHandler
 */
const io = require('socket.io')(server);

socketController.init(io);

module.exports = app;
