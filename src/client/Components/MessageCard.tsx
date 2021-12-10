import * as React from 'react';
import { Card, Switch, CardContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Message, MessageState, DataChangeType } from '../../model';
import { Socket } from 'socket.io';

export default function MessageCard(message: Message, socket: Socket) {
  const handleShowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      socket.emit('dataChange', { type: DataChangeType.SHOW_MESSAGE, id: message.id });
    } else {
      socket.emit('dataChange', { type: DataChangeType.REMOVE_MESSAGE, id: message.id });
    }
  };

  const handleIgnore = () => {
    socket.emit('dataChange', { type: DataChangeType.IGNORE_MESSAGE, id: message.id });
  };

  return (
    <Card variant="outlined">
      {message.state === MessageState.ARRIVED ?
        (
          <IconButton onClick={handleIgnore} aria-label="ignore">
            <CloseIcon />
          </IconButton>
        ) : ''
      }
      <CardContent>
        <p>
          {message.text}
        </p>
        <p style={{ fontStyle: "italic" }}>
          FROM: {message.from}
        </p>
        <p>
          TIME: {message.timestamp}
        </p>
        <p>
          SHOW: <Switch checked={message.state === MessageState.SHOWING} onChange={handleShowChange}
          />
        </p>
      </CardContent>
    </Card>
  );
}
