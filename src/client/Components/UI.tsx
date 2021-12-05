import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Ticker from 'react-ticker';
import PageVisibility from 'react-page-visibility';
import { AppData } from '../../model';


export function UI({ appData }: { appData: AppData }): React.ReactElement {
  const theme = useTheme();
  const [pageIsVisible, setPageIsVisible] = useState(true);

  const handleVisibilityChange = (isVisible: boolean) => {
    setPageIsVisible(isVisible);
  };

  return (
    <Box sx={{ display: 'fixed', position: 'relative', height: '720px', width: '1280px', backgroundColor: '#f0f', overflow: 'hidden' }}>
      <Box sx={{
        position: 'absolute',
        height: '60px',
        width: '100%',
        bottom: '20px',
        backgroundColor: theme.palette.primary.main
      }}>
        <PageVisibility onChange={handleVisibilityChange}>
          {pageIsVisible && (
            <Ticker offset={0} speed={25}>
              {({ index }) => {
                const activeMessages = appData.messages.filter(message => message.show);
                const nextMessage = activeMessages[index % activeMessages.length];
                return nextMessage ? (
                  <Typography paragraph sx={{ fontSize: 40, whiteSpace: 'nowrap', paddingRight: 20 }}>
                    {nextMessage.from}: {nextMessage.text}
                  </Typography>
                ) : (
                  <p style={{ visibility: "hidden" }}>Placeholder</p>
                );
              }}
            </Ticker>
          )}
        </PageVisibility>
      </Box>
    </Box>
  );
}