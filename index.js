require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const socketUtils = require('./utils/socketUtils');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {'pingTimeout': 7000, 'pingInterval': 3000, cors: {origin: '*'}});

connectDB();
socketUtils.connection(io);

const PORT = 4000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running at ${PORT}`));