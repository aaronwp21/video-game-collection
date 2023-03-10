import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import GameForm from '../components/forms/GameForm'
import { GamesContext } from '../components/contexts/game.context'

function Update() {
  const { id } = useParams();
  const { games, updateGame } = useContext(GamesContext)

  const gameFound = games.find((game) => parseInt(id) === game.id);

  return (
    <>
      <Typography variant="h2" component="h1" sx={{marginBottom: 2}}>
        Update {gameFound.title}
      </Typography>
      <GameForm game={gameFound} submitHandler={updateGame} />
    </>
  )
}

export default Update