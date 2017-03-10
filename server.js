
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const io = require('socket.io');
const logger = require('morgan');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const router = require('./routes');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './client' )));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


module.exports = app;