import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from './Header';

function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout