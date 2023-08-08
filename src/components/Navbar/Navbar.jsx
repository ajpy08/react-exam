import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{backgroundColor: '#5141EA'}}>
        <div>
        <img src='src/assets/files/dacodes.png' width="172px" height="68px" />
        </div>        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
