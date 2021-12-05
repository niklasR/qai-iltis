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
      <ListItem component={Link} to="/messages" key="Messages">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary="Messages" />
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
