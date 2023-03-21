import React, { createContext, useContext, useState, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { GAMES_ENDPOINT, STORAGE_KEY } from '../../settings';

import { UIContext } from "./UI.context";

export const GamesContext = createContext({
  fetchGames: () => [],
  addGame: () => {},
  updateGame: () => {},
  deleteGame: () => {},
  loaded: false,
  loading: false,
  error: null,
  games: [],
});

export const GamesProvider = ({ children }) => {
  const { showMessage } = useContext(UIContext);
  const [games, setGames] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchGames = useCallback(async () => {
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(GAMES_ENDPOINT);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setGames(data);
    } catch (err) {
      console.log('Error', err);
      setError(`Failed to load games`);
      showMessage({
        type: "error",
        string: `Error loading games`,
      });
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, [error, loaded, loading, setError, setGames, setLoaded, setLoading]);

  const addGame = useCallback(
    async (formData) => {
      try {
        const response = await fetch(GAMES_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedGame = await response.json();
        const newGames = [...games, savedGame];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newGames));
        setGames(newGames);
        showMessage({
          type: "success",
          string: `Added ${savedGame.title}`,
        });
      } catch (err) {
        showMessage({
          type: "error",
          string: `Error adding game`,
        });
        console.log(err);
      }
    },
    [games, setGames, showMessage],
  );

  const updateGame = useCallback(
    async (id, formData) => {
      let updatedGame = null;
      // Get index
      const index = games.findIndex((game) => game._id === id);
      if (index === -1) throw new Error(`Game with index ${id} not found`);
      // Get actual game
      const oldGame = games[index];

      try {
        // Merge with formData
        updatedGame = {
          ...oldGame,
          ...formData, // order here is important for the override!!
        };
        // recreate the games array
        const updatedGames = [
          ...games.slice(0, index),
          updatedGame,
          ...games.slice(index + 1),
        ];
        const response = await fetch(`${GAMES_ENDPOINT}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(updatedGame),
        });

        if (response.status !== 200) {
          throw response;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGames));
        setGames(updatedGames);
        showMessage({
          type: "success",
          string: `Updated ${oldGame.title}`,
        });
        navigate("/");
      } catch (err) {
        showMessage({
          type: "error",
          string: `Error updating ${oldGame.title}`,
        });
        console.log(err);
      }
    },
    [games, setGames, showMessage]
  );

  const deleteGame = useCallback(
    async (id) => {
      let deletedGame = null;
      try {
        const response = await fetch(`${GAMES_ENDPOINT}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        if (response.status !== 204) {
          throw response;
        }
        // Get index
        const index = games.findIndex((game) => game._id === id);
        deletedGame = games[index];
        // recreate the games array without that game
        const updatedGames = [
          ...games.slice(0, index),
          ...games.slice(index + 1),
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGames));
        setGames(updatedGames);
        showMessage({
          type: "success",
          string: `Deleted ${deletedGame.title}`,
        });
      } catch (err) {
        showMessage({
          type: "error",
          string: `Error deleting game`,
        });
        console.log(err);
      }
    },
    [games, setGames, showMessage]
  );

  return (
    <GamesContext.Provider
      value={{
        games,
        loading,
        error,
        fetchGames,
        addGame,
        updateGame,
        deleteGame,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
