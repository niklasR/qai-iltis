import React from 'react';
import { Box, Slide, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppData, MessageState } from '../../model';

export function ImageChroma({ appData }: { appData: AppData }): React.ReactElement {
  const theme = useTheme();

  const message = appData.messages.find((message) => {
    const isShowing = message.state === MessageState.SHOWING;
    const hasAttachment = message.attachment;
    return isShowing && hasAttachment;
  });

  const messageBox = <Box sx={{
    position: 'absolute',
    height: '864px',
    width: '768px',
    left: '1000px',
    top: '65px',
    backgroundColor: theme.palette.primary.main
  }}>
    {/* Name Box */}
    <Box sx={{
      position: 'absolute',
      height: '100px',
      width: '100%',
      top: '20px',
      paddingLeft: '10px',
      paddingRight: '10px',
      textAlign: 'center'
    }}>
      <Typography fontSize={70} fontWeight='bold' paragraph color='common.white'>
        {message?.from}
      </Typography>
    </Box>
    {/* Image 'Box */}
    <Box sx={{
      position: 'absolute',
      height: '500px',
      width: '100%',
      top: '160px',
      display: 'flex',
      justifyContent: 'center'
    }
    }>
      <img style={{ maxHeight: '100%', maxWidth: '100%', margin: 'auto' }} src={message?.attachment?.url} />
    </Box>
    {/* Caption Box */}
    <Box sx={{
      position: 'absolute',
      height: '140px',
      width: '100%',
      bottom: '20px',
      paddingLeft: '10px',
      paddingRight: '10px',
      textAlign: 'center',
      backgroundColor: theme.palette.primary.dark
    }
    }>
      <Typography fontSize={40} paragraph color='common.white'>
        {message?.text}
      </Typography>
    </Box>
  </Box>;

  return (
    <Slide direction="left" in={appData.elements.imageChroma.show && !!message} timeout={500}>
      {messageBox}
    </Slide>
  );
}