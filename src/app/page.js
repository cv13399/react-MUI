"use client";

import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveDrawer from './SideBar';
import SignIn from './SignInModal';
import { Modal } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={handleClose}>
        <SignIn/>
      </Modal>
      <ResponsiveDrawer handleSideBarBtnAction={() => {
        setOpen(true);
        console.log("Modal opened!");
      }}/>
    </ThemeProvider>
  );
}