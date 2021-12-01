

import express from 'express';
import http from 'http';
import { Server, Socket } from "socket.io";
import { Client } from 'socket.io/dist/client';
import { WhatsAppClient } from './whatsapp';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const wa = new WhatsAppClient();

const activeSockets: Set<Socket> = new Set();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, async () => {
  console.log('listening on *:3000');

  // Initialise Whatsapp
  await wa.init();

  wa.on('message', (message) => {
    console.log(`MESSAGE: ${JSON.stringify(message, null, 2)}`);

    activeSockets.forEach((socket) => {
      socket.send(message);
    });
  });

  io.on('connection', (socket) => {
    console.log('user connected');
    activeSockets.add(socket);

    socket.send('welcome')
    socket.on('message', (data) => {
      console.log('message: ' + data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      activeSockets.delete(socket);
    });
  });
});


