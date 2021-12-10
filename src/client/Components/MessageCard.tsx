import * as React from 'react';
import { Card, Switch, CardContent, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Message, MessageState, DataChangeType } from '../../model';
import { Socket } from 'socket.io';

export default function MessageCard(message: Message, socket: Socket) {
  const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    socket.emit('dataChange', { type: DataChangeType.AMEND_FROM, id: message.id, newFrom: event.target.value });
  };

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

  const getTextAndImage = () => {
    if(message.attachment){
      return ({message.text}<img src={`data:image/jpg;base64,${message.attachment.data}`}/>);
    }
    return ( {message.text} );
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
        <TextField id="input-from" sx={{ padding: '10px' }} label="From" variant="outlined" value={message.from} onChange={handleFromChange} />
        <br />
        <TextField id="input-text" sx={{ padding: '10px' }} label="Text" multiline InputProps={{ readOnly: true, }} maxRows={4} value={getTextAndImage()} />
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
