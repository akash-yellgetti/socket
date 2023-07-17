const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/socket.html');
});


const socketIO = (socket) => {
  console.log('a user connected');

  socket.on('chat message', msg => {
    console.log('chat message', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}


io.on('connection', socketIO);

server.listen(5000, () => {
  console.log('listening on *:5000');
});