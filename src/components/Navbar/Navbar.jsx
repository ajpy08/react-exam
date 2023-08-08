import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import logo from '../../assets/files/dacodes.png'

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{backgroundColor: '#5141EA'}}>
        <div>
        <img src={logo} width="172px" height="68px" />
        </div>        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
