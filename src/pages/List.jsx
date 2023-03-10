import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import React, { useContext, useEffect } from 'react'

import { GamesContext } from '../components/contexts/game.context';

import NoGames from '../components/NoGames';
import GamesList from '../components/GamesList';

function List() {
  const { games, fetchGames, deleteGame, loading, error } = useContext(GamesContext);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const deleteHandler = (id) => {
    deleteGame(id);
  };

  let callStatusComponent = null;

  if (loading) {
    callStatusComponent = <LinearProgress color='primary' />;
  } else if (error) {
    callStatusComponent = <p>{error}: Loading from localStorage</p>;
  } else if (games.length === 0) {
    callStatusComponent = <NoGames />;
  }
  return (
    <Container maxWidth='xl'>
      {/* <Typography variant='h3' component='h2' sx={{textDecoration: 'underline', marginBlockEnd: 2}}>
        Games
      </Typography> */}
      {callStatusComponent}
      <GamesList games={games} deleteHandler={deleteHandler} />
    </Container>
  )
}

export default List