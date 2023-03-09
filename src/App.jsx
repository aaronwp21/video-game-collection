import React from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { CssBaseline } from '@mui/material';

import { GamesProvider } from './components/contexts/game.context';

import Layout from './components/Layout';
import List from './pages/List';
import Add from './pages/Add';
import Update from './pages/Update';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <GamesProvider>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<List />} />
                <Route path='/add' element={<Add />} />
                <Route path='/update/:id' element={<Update />} />
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </GamesProvider>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App
