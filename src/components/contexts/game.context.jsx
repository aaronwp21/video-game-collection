import React, { createContext, useState, useCallback, useContext } from "react";

import { GAMES_ENDPOINT, STORAGE_KEY } from "../../settings";

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
  const [games, setGames] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchGames = useCallback(async () => {
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      console.log(`fetching from ${GAMES_ENDPOINT}`);
      const response = await fetch(GAMES_ENDPOINT);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setGames(data);
    } catch (err) {
      console.log("Error", err);
      setError(`Failed to load games`);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, [error, loaded, loading, setError, setGames, setLoaded, setLoading]);

  const addGame = useCallback(
    async (formData) => {
      console.log("about to add", formData);
      try {
        const response = await fetch(GAMES_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedGame = await response.json();
        console.log("got data", savedGame);
        const newGames = [...games, savedGame];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newGames));
        setCars(newGames);
      } catch (err) {
        console.log(err);
      }
    },
    [games, setGames]
  );

  const updateGame = useCallback(
    async (id, formData) => {
      console.log("updating", id, formData);
      let updatedGame = null;
      // Get index
      const index = games.findIndex((game) => game.id === id);
      console.log(index);
      if (index === -1) throw new Error(`Game with index ${id} not found`);
      // Get actual car
      const oldGame = games[index];
      console.log("oldGame", oldGame);

      // Send the differences, not the whole update
      const updates = {};

      for (const key of Object.keys(oldGame)) {
        if (key === "id") continue;
        if (oldGame[key] !== formData[key]) {
          updates[key] = formData[key];
        }
      }

      try {
        const response = await fetch(`${GAMES_ENDPOINT}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(updates),
        });

        if (response.status !== 200) {
          throw response;
        }

        // Merge with formData
        updatedGame = {
          ...oldGame,
          ...formData, // order here is important for the override!!
        };
        console.log("updatedGame", updatedGame);
        // recreate the cars array
        const updatedGames = [
          ...games.slice(0, index),
          updatedGame,
          ...games.slice(index + 1),
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGames));
        setGames(updatedGames);
      } catch (err) {
        console.log(err);
      }
    },
    [games, setGames]
  );

  const deleteGame = useCallback(
    async (id) => {
      let deletedGame = null;
      try {
        const response = await fetch(`${GAMES_ENDPOINT}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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
        const updatedGames = [...games.slice(0, index), ...games.slice(index + 1)];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGames));
        setGames(updatedGames);
        console.log(`Deleted ${deletedGame.name}`);
      } catch (err) {
        console.log(err);
      }
    },
    [games, setGames]
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
}