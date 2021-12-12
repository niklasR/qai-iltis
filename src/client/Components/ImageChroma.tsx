import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppData, MessageState } from '../../model';


export function ImageChroma({ appData, backgroundColor }: { appData: AppData, backgroundColor: string }): React.ReactElement {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'fixed', position: 'relative', height: '1080px', width: '1920px', backgroundColor, overflow: 'hidden' }}>
      <Box sx={{
        position: 'absolute',
        height: '864px',
        width: '768px',
        left: '880px',
        top: '108px',
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
          backgroundColor: theme.palette.primary.dark
        }}>
          <Typography fontSize={60} paragraph color='common.white'>
            Thomas Sizemorelong
          </Typography>
        </Box>
        {/* Image 'Box */}
        <Box sx={{
          position: 'absolute',
          height: '500px',
          width: '100%',
          top: '160px',
          backgroundColor: '#666'
        }
        }>
        </Box>
        {/* Caption Box */}
        <Box sx={{
          position: 'absolute',
          height: '140px',
          width: '100%',
          bottom: '20px',
          paddingLeft: '10px',
          paddingRight: '10px',
          backgroundColor: theme.palette.primary.dark
        }
        }>
          <Typography fontSize={40} paragraph color='common.white'>
            Thomas had something rather witty to say about this image.
          </Typography>
        </Box>
      </Box>
    </Box >
  );
}