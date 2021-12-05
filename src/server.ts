import express from "express";
import webpack, { Configuration } from 'webpack';
import http from 'http';
import { Server, Socket } from "socket.io";
import { WhatsAppClient } from './whatsapp';

import webpackDevMiddleware from 'webpack-dev-middleware';
import history from 'connect-history-api-fallback';
import api from './api/index';

import config from '../webpack.config.js';
import { AppData } from "./model";

const app = express();
const compiler = webpack(config as Configuration);
const port = 8080;

app.use('/api', api);

app.use(history());
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

const server = http.createServer(app);
const io = new Server(server);

const wa = new WhatsAppClient();
const activeSockets: Set<Socket> = new Set();
const appData: AppData = {
  messages: [
    {
      id: 'd7740221-6061-46f2-b2aa-e31837506a19',
      from: 'Nik',
      text: 'Hey there people, I\'m just testing the message implementation',
      timestamp: '2021-11-30T17:28:30',
      show: true
    },
    {
      id: 'af603643-1c88-494a-be00-cf951fb3c0cc',
      from: 'Pete Ludlow',
      text: 'You do know these are all just hardcoded dummies, don\'t you? 👻',
      timestamp: '2021-11-30T12:34:47',
      show: false
    }
  ],
  elements: {
    ticker: {
      show: true
    }
  }
};

function broadcastAppData() {
  activeSockets.forEach((socket) => {
    socket.emit('dataUpdate', appData);
  });
}

server.listen(port, async () => {
  console.log(`server started at http://localhost:${port}`);

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

    socket.send('welcome');
    socket.emit('dataUpdate', appData);
    socket.on('message', (data) => {
      console.log('message: ' + data);
    });

    socket.on('dataChange', (data) => {
      console.log('dataChange:', JSON.stringify(data));
      if (data.type === 'showMessage') {
        const i = appData.messages.findIndex((message) => message.id === data.id);
        console.log(`Message ${data.id} is in index ${i}`);
        appData.messages[i].show = data.show;
        broadcastAppData();
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      activeSockets.delete(socket);
    });
  });
});