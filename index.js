require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const socketUtils = require('./utils/socketUtils');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {'pingTimeout': 7000, 'pingInterval': 3000, cors: {origin: 'https://sushiville-socket.herokuapp.com/', methods: ["GET", "POST"]}});

connectDB();
socketUtils.connection(io);

app.use('/public', express.static('public'));
app.get('/', (req, res) => {
  res.json({
    message: 'io server running'
  });
});

let PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running at ${PORT}`));