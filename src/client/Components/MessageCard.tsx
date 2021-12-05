import * as React from 'react';
import { Card, Switch, CardContent } from '@mui/material';
import { Message } from '../../model';
import { Socket } from 'socket.io';

export default function MessageCard(message: Message, socket: Socket) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`changing data for ${message.id} to ${event.target.checked}`);
    socket.emit('dataChange', { type: 'showMessage', id: message.id, show: event.target.checked });
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
          SHOW: <Switch checked={message.show} onChange={handleChange}
          />
        </p>
      </CardContent>
    </Card>
  );
}
