import * as React from 'react';
import { Link } from "react-router-dom";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
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
      <ListItem component={Link} to="/messages/ignored" key="Ignored Messages">
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Ignored Messages" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} to="/ui" key="UI">
        <ListItemIcon>
          <LiveTvIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="UI" />
      </ListItem>
    </List>
    <Divider />
  </Box>
</Drawer>;
