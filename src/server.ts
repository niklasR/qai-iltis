import * as fs from 'fs/promises';
import express from "express";
import webpack, { Configuration } from 'webpack';
import http from 'http';
import { Server, Socket } from "socket.io";
import { WhatsAppClient } from './whatsapp';

import webpackDevMiddleware from 'webpack-dev-middleware';
import history from 'connect-history-api-fallback';
import api from './api/index';

import config from '../webpack.config.js';
import { AppData, DataChangeType, Message, MessageState } from "./model";
import { loadAppDataFromDisk } from './loadAppDataFromDisk';

export const APPDATA_PERSISTENCE_FILE_PATH = __dirname + '/../appData.json';

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

const appData: AppData = loadAppDataFromDisk();

async function handleAppDataUpdate() {
  activeSockets.forEach((socket) => {
    socket.emit('dataUpdate', appData);
  });

  await fs.writeFile(APPDATA_PERSISTENCE_FILE_PATH, JSON.stringify(appData), 'utf-8');
}

server.listen(port, async () => {
  console.log(`SERVER: Server started at http://localhost:${port}`);

  // Initialise Whatsapp
  await wa.init();

  wa.on('message', async (message: Message) => {
    console.log(`WA: MESSAGE: ${JSON.stringify(message, null, 2)}`);

    appData.messages.push(message);
    await handleAppDataUpdate();
  });

  io.on('connection', (socket) => {
    console.log('IO: user connected');
    activeSockets.add(socket);

    socket.send('welcome');
    socket.emit('dataUpdate', appData);
    socket.on('message', (data) => {
      console.log('IO: message: ' + data);
    });

    socket.on('dataChange', async (data) => {
      console.log('IO: dataChange:', JSON.stringify(data));
      if (data.type === DataChangeType.SHOW_MESSAGE) {
        const i = appData.messages.findIndex((message) => message.id === data.id);
        appData.messages[i].state = MessageState.SHOWING;
        await handleAppDataUpdate();
      }
      if (data.type === DataChangeType.IGNORE_MESSAGE) {
        const i = appData.messages.findIndex((message) => message.id === data.id);
        appData.messages[i].state = MessageState.IGNORED;
        await handleAppDataUpdate();
      }
      if (data.type === DataChangeType.REMOVE_MESSAGE) {
        const i = appData.messages.findIndex((message) => message.id === data.id);
        appData.messages[i].state = MessageState.REMOVED;
        await handleAppDataUpdate();
      }
      if (data.type === DataChangeType.AMEND_FROM) {
        const i = appData.messages.findIndex((message) => message.id === data.id);
        appData.messages[i].from = data.newFrom;
        await handleAppDataUpdate();
      }
    });

    socket.on('disconnect', () => {
      console.log('IO: user disconnected');
      activeSockets.delete(socket);
    });
  });
});