import React from 'react'

import Layout from './components/Layout';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<List />} />
              <Route path='/add' element={<Add />} />
              <Route path='/update/:id' element={<Update />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App
