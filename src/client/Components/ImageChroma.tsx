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
    height: '750px',
    width: '768px',
    left: '50px',
    top: '120px',
    backgroundColor: theme.palette.primary.main
  }}>
    {/* Name Box */}
    <Box sx={{
      position: 'absolute',
      height: '100px',
      width: '100%',
      top: '10px',
      paddingLeft: '10px',
      paddingRight: '10px',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <Typography fontSize={55} fontWeight='bold' style={{ height: '100%', margin: 'auto' }} paragraph color='common.white'>
        {message?.from}
      </Typography>
    </Box>
    {/* Image 'Box */}
    <Box sx={{
      position: 'absolute',
      height: '500px',
      width: '100%',
      top: '200px',
      display: 'flex',
      justifyContent: 'center'
    }
    }>
      <img style={{ maxHeight: '100%', maxWidth: '100%', margin: 'auto' }} src={message?.attachment?.url} />
    </Box>
  </Box>;

  return (
    <Slide direction="right" in={appData.elements.imageChroma.show && !!message} timeout={500}>
      {messageBox}
    </Slide>
  );
}