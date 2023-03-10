import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function DesktopHeader({navigate}) {
  return (
    <>
      <Typography
        onClick={() => navigate('/')}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, cursor: 'pointer' }}
      >
        Game Collection
      </Typography>
      <Button color="inherit" onClick={() => navigate('/add')}>
        Add Game
      </Button>
    </>
  );
}

export default DesktopHeader;
