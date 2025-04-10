import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navbar() {
  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#0000FF' }}>
          RIO Gaming
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ color: '#0000FF' }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/about" sx={{ color: '#0000FF' }}>
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;