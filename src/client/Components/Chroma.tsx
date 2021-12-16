import React from 'react';
import { Box } from '@mui/material';
import { AppData } from '../../model';
import { Ticker } from './Ticker';
import { ImageChroma } from './ImageChroma';


export function Chroma({ appData, backgroundColor }: { appData: AppData, backgroundColor: string }): React.ReactElement {

  return (
    <Box sx={{ display: 'fixed', position: 'relative', height: '1080px', width: '1920px', backgroundColor, overflow: 'hidden' }}>
      {appData.elements.imageChroma.show && (<ImageChroma appData={appData}></ImageChroma>)}
      <Ticker appData={appData}></Ticker>
    </Box >
  );
}