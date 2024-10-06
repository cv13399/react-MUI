"use client";

import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveDrawer from './SideBar';
import SignIn from './SignInModal';
import { Box, Modal } from '@mui/material';
import TodoArea from './TodoArea';


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleSideBarBtnAction = (text) => {
    if (text === "Login") {
      setOpen(true);
    }
    console.log("From main page!!!! " + text);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={handleClose}>
        <div>
          <Box onClick={handleClose}>
            <SignIn/>
          </Box>
        </div>
      </Modal>
      <ResponsiveDrawer handleSideBarBtnAction={handleSideBarBtnAction}/>
    </ThemeProvider>
  );
}