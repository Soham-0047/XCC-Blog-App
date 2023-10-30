import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import HeaderWithoutLogin from './HeaderWithoutLogin'


const user  = localStorage.getItem("token");
  
const Layout = () => {
  return (
    <main>
      
      {user &&
      <Header/>
      }
      {!user &&
      <HeaderWithoutLogin/>
      }
      
      <Outlet/>
    </main>
    
  )
}

export default Layout