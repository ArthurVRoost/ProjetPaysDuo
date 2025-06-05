import { useState } from 'react'
import './App.css'
import Nav from './components/nav/Nav'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Details from './Pages/Details/Details'

function App() {
  

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:countryName" element={<Details />} />
      </Routes>
    
    </>
  )
}

export default App
