import React from 'react';
import { Box } from '@mui/material';
import { AppData } from '../../model';
import { Ticker } from './Ticker';
import { ImageChroma } from './ImageChroma';
import { Socket } from 'socket.io-client';


export function Chroma({ appData, socket, backgroundColor }: { appData: AppData, socket: Socket, backgroundColor: string }): React.ReactElement {
  return (
    <Box sx={{ display: 'fixed', position: 'relative', height: '1080px', width: '1920px', backgroundColor, overflow: 'hidden' }}>
        <ImageChroma appData={appData}></ImageChroma>
        <Ticker appData={appData} socket={socket}></Ticker>
    </Box >
  );
}