import * as React from 'react';
import { Link } from "react-router-dom";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';
import ImageIcon from '@mui/icons-material/Image';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Switch } from '@mui/material';
import { AppData, DataChangeType } from '../../model';
import { Socket } from 'socket.io';

const drawerWidth = 240;

export function Navigation({ appData, socket }: { appData: AppData, socket: Socket }) {

  const handleTickerToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    socket.emit('dataChange', { type: DataChangeType.TOGGLE_TICKER, show: event.target.checked });
  };

  const handleImageToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    socket.emit('dataChange', { type: DataChangeType.TOGGLE_IMAGE_CHROMA, show: event.target.checked });
  };

  return (<Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItem component={Link} to="/messages/arrived" key="New Messages">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="New Messages" />
        </ListItem>
        <ListItem component={Link} to="/messages/showing" key="LIVE Messages">
          <ListItemIcon>
            <NotificationsActiveIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="LIVE Messages" />
        </ListItem>
        <ListItem component={Link} to="/messages/shown" key="Shown Messages">
          <ListItemIcon>
            <MarkEmailReadIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Shown Messages" />
        </ListItem>
        <ListItem component={Link} to="/messages/bin" key="Message Bin">
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Message Bin" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/images/arrived" key="Images">
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="New Images" />
        </ListItem>
        <ListItem component={Link} to="/images/showing" key="Images">
          <ListItemIcon>
            <PhotoCameraBackIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Live Image" />
        </ListItem>
        <ListItem component={Link} to="/images/shown" key="Images">
          <ListItemIcon>
            <BrokenImageIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Shown Images" />
        </ListItem>
        <ListItem component={Link} to="/images/bin" key="Images">
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Image Bin" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/chroma" key="chroma">
          <ListItemIcon>
            <LiveTvIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Chroma (Ticker + Image)" />
        </ListItem>
        <Divider />

        <ListItem>
          <ListItemIcon>
            <BlurLinearIcon />
          </ListItemIcon>
          <ListItemText id="switch-ticker" primary="Show Ticker" />
          <Switch edge="end" onChange={handleTickerToggle} checked={appData.elements.ticker.show} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BlurLinearIcon />
          </ListItemIcon>
          <ListItemText id="switch-image-chroma" primary="Show Image" />
          <Switch edge="end" onChange={handleImageToggle} checked={appData.elements.imageChroma.show} />
        </ListItem>
        <Divider />
      </List>
    </Box>
  </Drawer>
  );
}
