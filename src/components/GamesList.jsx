import React from 'react';

import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function GamesList({
  games = [],
  deleteHandler = () => console.log('No deletehandler provided'),
}) {
  const theme = useTheme();
  const mobileClosed = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box sx={{display: 'flex', flexDirection: mobileClosed ? 'row' : 'column', justifyContent: 'center', gap: 2, flexWrap: 'wrap', alignItems: mobileClosed ? 'initial' : 'center'}}>
      {games.map(({ title, gamesConsole, cover_url, id }) => (
        <Card key={id} sx={{ width: '100%', maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt={title}
            height="140"
            image={cover_url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {gamesConsole}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              aria-label="update"
              size="small"
              component={Link}
              to={`/update/${id}`}
            >
              Edit
            </Button>
            <Button
              aria-label="delete"
              size="small"
              onClick={() => deleteHandler(id)}
            >
              Remove
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default GamesList;
