const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');


const router = require('./routes');
const socketHandler = require('./app/controllers/socketController');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './client')));

app.use('/', router);


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

socketHandler.init(io);

module.exports = app;
