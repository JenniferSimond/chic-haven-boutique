import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHome from './components/AdminHome'


import {Container, Typography} from '@mui/material'

// import './App.css'

function App() {
  const [token, setToken] = useState('')
  const [userRole, setUserRole] = useState('')
  return (
    <Container >

    <Typography variant='h1'>Home</Typography>
    <Routes>
      <Route path='/' element={<adminLogin />} />
      <Route path='/home' element={<AdminHome />} />
      <Route path='/login' element={<AdminLogin />} />
    </Routes>
    </Container>
  )
}

export default App
