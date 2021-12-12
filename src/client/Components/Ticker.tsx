import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Transition } from 'react-transition-group';
import ReactTicker from 'react-ticker';
import PageVisibility from 'react-page-visibility';
import { AppData, MessageState } from '../../model';


export function Ticker({ appData, backgroundColor }: { appData: AppData, backgroundColor: string }): React.ReactElement {
  const theme = useTheme();
  const [pageIsVisible, setPageIsVisible] = useState(true);

  const handleVisibilityChange = (isVisible: boolean) => {
    setPageIsVisible(isVisible);
  };

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles: { [id: string]: React.CSSProperties } = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <Box sx={{ display: 'fixed', position: 'relative', height: '1080px', width: '1920px', backgroundColor, overflow: 'hidden' }}>
      <Transition in={appData.elements.ticker.show} timeout={duration}>
        {state => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            <Box sx={{
              position: 'absolute',
              height: '60px',
              width: '100%',
              bottom: '20px',
              backgroundColor: theme.palette.primary.main
            }}>
              <PageVisibility onChange={handleVisibilityChange}>
                {pageIsVisible && (
                  <ReactTicker offset={0} speed={25}>
                    {({ index }) => {
                      const activeMessages = appData.messages.filter((message) => {
                        const isShowing = message.state === MessageState.SHOWING;
                        const hasNoAttachement = !message.attachment;
                        return isShowing && hasNoAttachement;
                      });
                      const nextMessage = activeMessages[index % activeMessages.length];
                      return nextMessage ? (
                        <Typography paragraph sx={{ fontSize: 40, whiteSpace: 'nowrap', paddingRight: 20 }}>
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
          </div>
        )}
      </Transition>
    </Box>
  );
}