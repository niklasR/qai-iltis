import * as fs from 'fs/promises';
import express from "express";
import path from "path";
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

app.use('/static', express.static(path.join(__dirname, '../static')));
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
        const i = appData.messages.findIndex((message) => {
          return message.id === data.id;
        });
        if (i < 0) {
          console.log('message not found');
          return;
        }
        // if image, unshow any currently live images
        if (appData.messages[i].attachment) {
          appData.messages.forEach((message) => {
            if (message.attachment && message.state === MessageState.SHOWING) message.state = MessageState.SHOWN;
          });
        }
        appData.messages[i].state = MessageState.SHOWING;
        await handleAppDataUpdate();
      }
      if (data.type === DataChangeType.REMOVE_MESSAGE) {
        const i = appData.messages.findIndex((message) => {
          return message.id === data.id;
        });
        if (i < 0) {
          console.log('message not found');
          return;
        }
        if (appData.messages[i].state === MessageState.BIN) {
          appData.messages.splice(i, 1);
        } else {
          appData.messages[i].state = MessageState.BIN;
        }
        await handleAppDataUpdate();
      }
      if (data.type === DataChangeType.UNSHOW_MESSAGE) {
        const i = appData.messages.findIndex((message) => {
          return message.id === data.id;
        });
        if (i < 0) {
          console.log('message not found');
          return;
        }
        appData.messages[i].state = MessageState.SHOWN;
        await handleAppDataUpdate();
      }
      if (data.type === DataChangeType.UNARCHIVE_MESSAGE) {
        const i = appData.messages.findIndex((message) => {
          return message.id === data.id;
        });
        if (i < 0) {
          console.log('message not found');
          return;
        }
        appData.messages[i].state = MessageState.ARRIVED;
        await handleAppDataUpdate();
      }
      if (data.type === DataChangeType.AMEND_FROM) {
        console.log(appData.messages);
        const i = appData.messages.findIndex((message) => {
          return message.id === data.id;
        });
        if (i < 0) {
          console.log('message not found');
          return;
        }
        appData.messages[i].from = data.newFrom;
        await handleAppDataUpdate();
      }
      if (data.type === DataChangeType.AMEND_TEXT) {
        const i = appData.messages.findIndex((message) => {
          return message.id === data.id;
        });
        if (i < 0) {
          console.log('message not found');
          return;
        }
        appData.messages[i].text = data.newText;
        await handleAppDataUpdate();
      }
      if (data.type === DataChangeType.TOGGLE_TICKER) {
        appData.elements.ticker.show = data.show;
        await handleAppDataUpdate();
      }
      if (data.type === DataChangeType.TOGGLE_IMAGE_CHROMA) {
        appData.elements.imageChroma.show = data.show;
        await handleAppDataUpdate();
      }
    });

    socket.on('disconnect', () => {
      console.log('IO: user disconnected');
      activeSockets.delete(socket);
    });
  });
});