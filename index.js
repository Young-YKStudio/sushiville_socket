require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const cors = require('cors');

app.use(
  cors({
    origin: ['https://www.sushivilleny.com/dashboard', 'https://www.sushivilleny.com', 'https://sushivilleny.com', 'https://sushivilleny.com/dashboard', 'https://www.sushivilleny.com/order' ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-type', 'Accept'],
  })
)
const server = http.createServer(app);
const connectDB = require('./config/db');
const socketUtils = require('./utils/socketUtils');

const io = new Server(server, {'pingTimeout': 7000, 'pingInterval': 3000}, {allowRequest: (req, callback) => {
  const noOriginHeader = req.headers.origin === undefined;
  callback(null, noOriginHeader)
}});

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