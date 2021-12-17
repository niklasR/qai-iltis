import React, { useState } from 'react';
import { Box, Slide, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactTicker from 'react-ticker';
import PageVisibility from 'react-page-visibility';
import { AppData, DataChangeType, MessageState } from '../../model';
import { config } from '../../config';
import { Socket } from 'socket.io-client';

const PLACEHOLDER_MESSAGE = <p style={{ visibility: "hidden" }}>Placeholder</p>;

export function Ticker({ appData, socket }: { appData: AppData, socket: Socket }): React.ReactElement {
  const theme = useTheme();
  const [pageIsVisible, setPageIsVisible] = useState(true);

  const handleVisibilityChange = (isVisible: boolean) => {
    setPageIsVisible(isVisible);
  };

  const unshowMessage = (messageId: string) => {
    socket.emit('dataChange', { type: DataChangeType.UNSHOW_MESSAGE, id: messageId });
  };

  const messageCounter = new Map<string, number>();

  return (
    <>
      <Slide direction="up" in={appData.elements.ticker.show || appData.elements.imageChroma.show} timeout={500}>
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
                  
                  if (appData.elements.imageChroma.show) {
                    const imageMessage = appData.messages.find((message) => {
                      const isShowing = message.state === MessageState.SHOWING;
                      const hasAttachment = message.attachment;
                      return isShowing && hasAttachment;
                    });
                    if (!imageMessage) return PLACEHOLDER_MESSAGE;
                    
                    return (<Typography paragraph sx={{ fontSize: 70, whiteSpace: 'nowrap', paddingRight: 20 }}>
                      {imageMessage.from && imageMessage.text ? `${imageMessage.from}` : ''}{imageMessage.from && imageMessage.text ? `: ${imageMessage.text}` : ''}
                    </Typography>);
                  }

                  if (!appData.elements.ticker.show) return PLACEHOLDER_MESSAGE;

                  const activeMessages = appData.messages.filter((message) => {
                    const isShowing = message.state === MessageState.SHOWING;
                    const hasNoAttachement = !message.attachment;
                    return isShowing && hasNoAttachement;
                  });
                  const nextMessage = activeMessages[index % activeMessages.length];
                  if (!nextMessage) return PLACEHOLDER_MESSAGE;

                  const count = messageCounter.get(nextMessage.id) || 0;
                  if (count >= 2) {
                    messageCounter.delete(nextMessage.id);
                    unshowMessage(nextMessage.id);
                    return PLACEHOLDER_MESSAGE;
                  } else {
                    messageCounter.set(nextMessage.id, count + 1);
                  }

                  return (<Typography paragraph sx={{ fontSize: 70, whiteSpace: 'nowrap', paddingRight: 20 }}>
                    {nextMessage.from && nextMessage.text ? `${nextMessage.from}` : ''}{nextMessage.from && nextMessage.text ? `: ${nextMessage.text}` : ''}
                  </Typography>);
                }}
              </ReactTicker>
            )}
          </PageVisibility>
        </Box>
      </Slide>
    </>
  );
}