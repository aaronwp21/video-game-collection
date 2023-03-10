import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
// import CircularProgress from "@mui/material/CircularProgress";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

const schema = yup.object().shape({
  title: yup.string().required(),
  gamesConsole: yup.string().required(),
  cover_url: yup.string().url()
})

const defaults = {
  title: "",
  gamesConsole: "",
  console_url: ""
}

export default function GameForm({game, submitHandler}){
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
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
    game ? submitHandler(game.id, vals) : submitHandler(vals);
  };

  return(
    <form onSubmit={handleSubmit(submitFn)}>
      <div>
      <Controller
          control={control}
          name="title"
          defaultValue={""}
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
          name="gamesConsole"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              variant="filled"
              {...field}
              label="Games Console"
              fullWidth
              error={!!errors.gamesConsole}
              helperText={errors.gamesConsole?.message}
            />
          )}
        />
      </div>
      <div>
      <Controller
          control={control}
          name="cover_url"
          defaultValue={""}
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

      <div style={{ marginTop: 20 }}>
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
    </form>
  )
}