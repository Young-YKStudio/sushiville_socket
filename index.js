require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { server } = require('socket.io');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);
const connectDB = require('./config/db');
const socketUtils = require('./utils/socketUtils');

app.use(cors());

const io = new Server(httpServer, {'pingTimeout': 7000, 'pingInterval': 3000, cors: {origin: '*', methods: ["GET", "POST"]}});

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