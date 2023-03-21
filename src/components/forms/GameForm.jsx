import React, { useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useForm, Controller } from 'react-hook-form';
// import CircularProgress from "@mui/material/CircularProgress";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box } from '@mui/material';

const schema = yup.object().shape({
  title: yup.string().required(),
  games_console: yup.string().required(),
  cover_url: yup.string().url().required(),
});

const defaults = {
  title: '',
  games_console: '',
  console_url: '',
};

export default function GameForm({ game, submitHandler }) {
  const theme = useTheme();
  const mobileClosed = useMediaQuery(theme.breakpoints.up('md'));
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: game || defaults,
  });

  useEffect(() => {
    // console.log('useeffect', car);
    if (game) {
      reset(game);
    }
  }, [game, reset]);

  let submitFn = (vals) => {
    reset();
    game ? submitHandler(game._id, vals) : submitHandler(vals);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitFn)} style={{width: '100%'}}>
        <Box sx={{display: 'grid', gridTemplateColumns: mobileClosed ? 'repeat(3, 1fr)' : '100%', justifyContent: 'center', gap: 1}}>
          <div>
            <Controller
              control={control}
              name="title"
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  type="text"
                  variant="filled"
                  {...field}
                  label="Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="games_console"
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  type="text"
                  variant="filled"
                  {...field}
                  label="Games Console"
                  fullWidth
                  error={!!errors.games_console}
                  helperText={errors.games_console?.message}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="cover_url"
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  type="text"
                  variant="filled"
                  {...field}
                  label="Cover Photo"
                  fullWidth
                  error={!!errors.cover_url}
                  helperText={errors.cover_url?.message}
                />
              )}
            />
          </div>
  
          <div style={mobileClosed ? {marginTop: 20, gridColumn: 2, justifySelf: 'center'} : { marginTop: 20 }}>
            <Button
              type="reset"
              onClick={() => reset()}
              variant="contained"
              sx={{ mr: 2 }}
              disabled={!isDirty}
            >
              Reset
            </Button>
            <Button
              type="submit"
              primary="true"
              variant="contained"
              disabled={isSubmitting || !isDirty || (isDirty && !isValid)}
            >
              Submit
            </Button>
          </div>
        </Box>
      </form>
    </>
  );
}
