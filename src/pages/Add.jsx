import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
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
    <>
      <Typography variant='h2' component='h1'>
        Add Game
      </Typography>
      <GameForm submitHandler={submitHandler} />
    </>
  )
}

export default Add