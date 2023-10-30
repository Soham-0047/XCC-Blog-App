import React from 'react'
import './App.css'
import { Routes,Route, Navigate } from 'react-router'
import Layout from './components/Layout'
import Indexpage from './pages/Indexpage';
import Register from './pages/Register';
import Login from './pages/Login';
import EmailVerify from "./pages/EmailVerify";
import Header from './components/Header';



function App() {
  
 
  return (

  <Routes>

     <Route path="/" exact element={<Layout/>}>

      <Route index element={<Indexpage/>}/> 

      <Route path="/login" eaxct element={<Login/>}/>

      <Route path="/register" exact element={<Register/>}/>

      <Route path="/" exact element={<Navigate replace to="/login"/>}/>

      <Route path="/users/:id" element={<Header/>}/>
      
     </Route>
     <Route path="/users/:id/verify/:token"element={<EmailVerify/>}/>
  </Routes>
  )
}

export default App
