import * as React from 'react';
import { Link } from "react-router-dom";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleIcon from '@mui/icons-material/People';
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
      <ListItem component={Link} to="/messages/arrived" key="Arrived Messages">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Arrived Messages" />
      </ListItem>
    </List>
    <List>
      <ListItem component={Link} to="/messages/showing" key="Showing Messages">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Showing Messages" />
      </ListItem>
    </List>
    <List>
      <ListItem component={Link} to="/messages/shown" key="Shown Messages">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Shown Messages" />
      </ListItem>
    </List>
    <List>
      <ListItem component={Link} to="/messages/ignored" key="Ignored Messages">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Ignored Messages" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} to="/ui" key="UI">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="UI" />
      </ListItem>
    </List>
    <Divider />
  </Box>
</Drawer>;
