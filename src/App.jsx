import { useState } from 'react'
import './App.css'
import Nav from './components/nav/Nav'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Details from './Pages/Details/Details'
import Layout from './components/Layout'

function App() {
  

  return (
    <>
      
      <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="country/:countryName" element={<Details />} />
            </Route>
        </Routes>
    
    </>
  )
}

export default App
