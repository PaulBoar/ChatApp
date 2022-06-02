const express = require('express');

const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('user connected: ' + socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user with id ${socket.id} joined the room ${data}`);
  });

  socket.on('join_global', data => {
    socket.join('global')
    console.log(`${data} user id ${socket.id} joined global chat`)
  })

  socket.on('send', (data) => {
    if (data.room === 'global' || data.room === '') {
      socket.to('global').emit('receive', data);
      console.log(`GLOBAL`);
    } else  {
      console.log(`${data.author} sent ${data.message} at ${data.date}`);
      socket.to(data.room).emit('receive', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
    socket.removeAllListeners();
  });
});

server.listen(PORT, () => {
  console.log('server is running on port: ' + PORT);
});
