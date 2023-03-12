import React from 'react'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

function NotFound() {
  return (
    <Container maxWidth='xl' sx={{display: 'flex', justifyContent: 'center'}}>
      <Typography variant='h2' component='h1'>Page Not Found</Typography>
    </Container>
  )
}

export default NotFound