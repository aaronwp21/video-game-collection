import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import React, { useContext, useEffect } from 'react'

import { GamesContext } from '../components/contexts/game.context';

import NoGames from '../components/NoGames';

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
    <>
      <Typography variant='h3' component='h2' sx={{textDecoration: 'underline'}}>
        Games
      </Typography>
      {callStatusComponent}
      {/* <GamesList games={games} deleteHandler={deleteHandler} /> */}
    </>
  )
}

export default List