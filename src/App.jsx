import React from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<List />} />
            <Route path='/add' element={<Add />} />
            <Route path='/update/:id' element={<Update />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
