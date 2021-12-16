import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import ReactTicker from 'react-ticker';
import PageVisibility from 'react-page-visibility';
import { AppData, MessageState } from '../../model';
import { config } from '../../config';

export function Ticker({ appData }: { appData: AppData }): React.ReactElement {
  const theme = useTheme();
  const [pageIsVisible, setPageIsVisible] = useState(true);

  const handleVisibilityChange = (isVisible: boolean) => {
    setPageIsVisible(isVisible);
  };


  return (
    <>
      <Slide direction="up" in={appData.elements.ticker.show} timeout={500}>
      <Box sx={{
        position: 'absolute',
        height: '100px',
        width: '100%',
        bottom: '30px',
        backgroundColor: theme.palette.primary.main
      }}>
        <PageVisibility onChange={handleVisibilityChange}>
          {pageIsVisible && (
            <ReactTicker offset={0} speed={config.SCROLL_SPEED}>
              {({ index }) => {
                const activeMessages = appData.messages.filter((message) => {
                  const isShowing = message.state === MessageState.SHOWING;
                  const hasNoAttachement = !message.attachment;
                  return isShowing && hasNoAttachement;
                });
                const nextMessage = activeMessages[index % activeMessages.length];
                return nextMessage ? (
                  <Typography paragraph sx={{ fontSize: 70, whiteSpace: 'nowrap', paddingRight: 20 }}>
                    {nextMessage.from}: {nextMessage.text}
                  </Typography>
                ) : (
                  <p style={{ visibility: "hidden" }}>Placeholder</p>
                );
              }}
            </ReactTicker>
          )}
        </PageVisibility>
      </Box>
    </Slide>
    </>
  );
}