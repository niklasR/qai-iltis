import * as React from 'react';
import { Card, Switch, CardContent, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { Message, MessageState, DataChangeType } from '../../model';
import { Socket } from 'socket.io';

export default function MessageCard(message: Message, socket: Socket) {
  const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    socket.emit('dataChange', { type: DataChangeType.AMEND_FROM, id: message.id, newFrom: event.target.value });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    socket.emit('dataChange', { type: DataChangeType.AMEND_TEXT, id: message.id, newText: event.target.value });
  };

  const handleShowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      socket.emit('dataChange', { type: DataChangeType.SHOW_MESSAGE, id: message.id });
    } else {
      socket.emit('dataChange', { type: DataChangeType.UNSHOW_MESSAGE, id: message.id });
    }
  };

  const handleRemove = () => {
    socket.emit('dataChange', { type: DataChangeType.REMOVE_MESSAGE, id: message.id });
  };

  const handleUnarchive = () => {
    socket.emit('dataChange', { type: DataChangeType.UNARCHIVE_MESSAGE, id: message.id });
  };

  const getAttachment = () => {
    if (message.attachment) {
      return (
        <p>
          <img style={{ maxHeight: '400px', maxWidth: '400px', margin: 'auto' }} src={message.attachment.url} />
        </p>);
    }
  };

  return (
    <Card variant="outlined" >
      <IconButton onClick={handleRemove} aria-label="remove">
        <CloseIcon />
      </IconButton>
      {message.state === MessageState.BIN && (
      <IconButton onClick={handleUnarchive} aria-label="unarchive">
        <UnarchiveIcon />
      </IconButton>
      )}
      <CardContent>
        <TextField id="input-from" sx={{ padding: '10px' }} label="From" variant="outlined" value={message.from} onChange={handleFromChange} />
        <br />
        <TextField id="input-text" sx={{ padding: '10px' }} label="Text" multiline variant="outlined" maxRows={4} value={message.text} onChange={handleTextChange} />
        {getAttachment()}
        <p>
          TIME: {(new Date(message.timestamp)).toLocaleString()}
        </p>
        <p>
          SHOW: <Switch checked={message.state === MessageState.SHOWING} onChange={handleShowChange}
          />
        </p>
      </CardContent>
    </Card>
  );
}
