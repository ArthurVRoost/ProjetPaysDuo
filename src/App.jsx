import { useState } from 'react'
import './App.css'
import Nav from './components/nav/Nav'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
