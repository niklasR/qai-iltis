import * as React from 'react';
import { Link } from "react-router-dom";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import ImageIcon from '@mui/icons-material/Image';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

const drawerWidth = 240;

export const Navigation = <Drawer
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
    </List>
    <List>
      <ListItem component={Link} to="/messages/showing" key="LIVE Messages">
        <ListItemIcon>
          <NotificationsActiveIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="LIVE Messages" />
      </ListItem>
    </List>
    <List>
      <ListItem component={Link} to="/messages/shown" key="Shown Messages">
        <ListItemIcon>
          <MarkEmailReadIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Shown Messages" />
      </ListItem>
    </List>
    <List>
      <ListItem component={Link} to="/messages/bin" key="Message Bin">
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Message Bin" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} to="/images/arrived" key="Images">
        <ListItemIcon>
          <ImageIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="New Images" />
      </ListItem>
    </List>
    <List>
      <ListItem component={Link} to="/images/showing" key="Images">
        <ListItemIcon>
          <PhotoCameraBackIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Live Image" />
      </ListItem>
    </List>
    <List>
      <ListItem component={Link} to="/images/shown" key="Images">
        <ListItemIcon>
          <BrokenImageIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Shown Images" />
      </ListItem>
    </List>
    <List>
      <ListItem component={Link} to="/images/bin" key="Images">
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Image Bin" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} to="/ticker" key="ticker-chroma">
        <ListItemIcon>
          <LiveTvIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Ticker (Chroma)" />
      </ListItem>
    </List>
    <List>
      <ListItem component={Link} to="/image-chroma" key="image-chroma">
        <ListItemIcon>
          <LiveTvIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Image (Chroma)" />
      </ListItem>
    </List>
    <Divider />
  </Box>
</Drawer>;
