'use client'

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import DensitySmallRoundedIcon from '@mui/icons-material/DensitySmallRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import TodoArea from './TodoArea';


const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const handleSideBarBtnAction = props.handleSideBarBtnAction;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const IconSelector = (props) => {
    if (props.name === "All") {
      return <DensitySmallRoundedIcon/>
    }
    else if(props.name === "Todo"){
      return <PlaylistAddRoundedIcon/>
    }
    else if(props.name === "In Progress"){
      return <LoopRoundedIcon/>
    }
    else if(props.name === "Done"){
      return <DoneOutlineRoundedIcon/>
    }
    else if(props.name === "Settings"){
      return <SettingsRoundedIcon />
    }
    else if(props.name === "Login"){
      return <LoginRoundedIcon />
    }
    else if(props.name === "Profile"){
      return <AccountCircleRoundedIcon />
    }
  }

  const drawer = (
    <div>
      <Divider />
      <List>
        {['All', 'Todo', 'In Progress', 'Done'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>{handleSideBarBtnAction(text)}}>
              <ListItemIcon>
                <IconSelector name={text} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Profile', 'Settings', 'Login'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>{handleSideBarBtnAction(text)}}>
              <ListItemIcon>
                <IconSelector name={text} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" noWrap component="div">
              Personal Todo List
            </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{flexGrow: 1, py: 2, pt:10, px:2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <TodoArea/>
        <Toolbar />
      </Box>
    </Box>
  );
}