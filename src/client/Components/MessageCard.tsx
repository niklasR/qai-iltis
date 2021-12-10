import * as React from 'react';
import { Card, Switch, CardContent } from '@mui/material';
import { Message, MessageState, DataChangeType } from '../../model';
import { Socket } from 'socket.io';

export default function MessageCard(message: Message, socket: Socket) {
  const handleShowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      socket.emit('dataChange', { type: DataChangeType.showMessage, id: message.id });
    } else {
      socket.emit('dataChange', { type: DataChangeType.removeMessage, id: message.id });
    }
  };

  return (
    <Card variant="outlined">
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
