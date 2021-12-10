import * as React from 'react';
import { Box, Grid, Toolbar } from '@mui/material';
import { MessageState, AppData, Message } from '../../model';
import MessageCard from './MessageCard';
import { Socket } from 'socket.io';


export function Messages({ appData, socket, mode }: { appData: AppData, socket: Socket, mode: MessageState }) {

  function createMessagesCard(Message: Message): JSX.Element {
    return (
      <Grid key={Message.id} item md={10}>
        {MessageCard(Message, socket)}
      </Grid>
    );
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Grid container spacing={3}>
        {appData.messages.filter((message) => {
          return message.state === mode;
        }).sort((a, b) => {
          return a.timestamp - b.timestamp;
        }).map(createMessagesCard)}
      </Grid>
    </Box>
  );
}
