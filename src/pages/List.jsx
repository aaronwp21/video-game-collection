import React, { useContext, useEffect, useState } from 'react';

import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { GamesContext } from '../components/contexts/game.context';

import NoGames from '../components/NoGames';
import GamesList from '../components/GamesList';

function List() {
  const { games, fetchGames, deleteGame, loading, error } =
    useContext(GamesContext);
  const [sorter, setSorter] = useState('title');

  const handleChange = (event) => {
    setSorter(event.target.value);
  };

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const deleteHandler = (id) => {
    deleteGame(id);
  };

  let callStatusComponent = null;

  if (loading) {
    callStatusComponent = <LinearProgress color="primary" />;
  } else if (error) {
    callStatusComponent = <p>{error}: Loading from localStorage</p>;
  } else if (games.length === 0) {
    callStatusComponent = <NoGames />;
  }
  return (
    <Container maxWidth="xl">
      <FormControl sx={games.length === 0 ? {display: 'none'} : {marginBlockEnd: 4}}>
        <FormLabel id="demo-controlled-radio-buttons-group">Sort By:</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={sorter}
          onChange={handleChange}
        >
          <FormControlLabel value="title" control={<Radio />} label="Title" />
          <FormControlLabel value="gamesConsole" control={<Radio />} label="Console" />
        </RadioGroup>
      </FormControl>
      {callStatusComponent}
      <GamesList games={games} deleteHandler={deleteHandler} sorter={sorter} />
    </Container>
  );
}

export default List;
