import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

function Header() {
  const [drawToggle, setDrawToggle] = useState(false);
  const theme = useTheme();
  const mobileClosed = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setDrawToggle((prevState) => !prevState);
  };

  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setDrawToggle(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: (mobileClosed ? 'none': 'initial') }}
          >
            <MenuIcon />
          </IconButton>
          {mobileClosed ? <DesktopHeader navigate={navigate} /> : <MobileHeader drawToggle={drawToggle} handleDrawerToggle={handleDrawerToggle} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
