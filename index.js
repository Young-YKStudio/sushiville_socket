require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const cors = require('cors');

app.use(cors())
const server = http.createServer(app);
const connectDB = require('./config/db');
const socketUtils = require('./utils/socketUtils');

const io = new Server(server, {'pingTimeout': 7000, 'pingInterval': 3000}, {cors: {
  origin: 'https://www.sushivilleny.com', 
  methods: ["GET", "POST"], 
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-type', 'Accept'], credentials: true}});

connectDB();
socketUtils.connection(io);

app.use('/public', express.static('public'));
app.get('/', (req, res) => {
  res.json({
    message: 'io server running'
  });
});

let PORT = process.env.PORT || 4000;

server.prependListener('request', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
})

server.listen(PORT, () => console.log(`Server running at ${PORT}`));