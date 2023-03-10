import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import Container from '@mui/material/Container'

import GameForm from '../components/forms/GameForm'
import { GamesContext } from '../components/contexts/game.context'

function Add() {
  const { addGame } = useContext(GamesContext)
  const navigate = useNavigate();

  const submitHandler = (data) => {
    addGame(data);
    navigate("/");
  }
  return (
    <Container maxWidth="lg">
      <Typography variant='h2' component='h1' sx={{marginBlockEnd: 3, textDecoration: 'underline'}}>
        Add Game
      </Typography>
      <GameForm submitHandler={submitHandler} />
    </Container>
  )
}

export default Add