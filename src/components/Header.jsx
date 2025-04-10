import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(45deg, #00ffc6, #ff00c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #00ffc6, #ff00c8);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Header = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <StyledAppBar position="sticky">
        <Toolbar>
          <Logo variant="h1">
            RIO WORLD
          </Logo>
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/about">About</NavLink>
          </NavLinks>
        </Toolbar>
      </StyledAppBar>
    </motion.div>
  );
};

export default Header;