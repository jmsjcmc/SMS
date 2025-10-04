import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import SignIn from './pages/Auth/SignIn'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
      </Routes>
    </AuthProvider>
  )
}

export default App
