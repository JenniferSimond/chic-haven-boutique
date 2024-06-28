import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHome from './components/admin-user/AdminHome';
import AdminLogin from './components/admin-user/AdminLogin';
import ManageUsers from './components/users/ManageUsers';
import ManageProducts from './components/products/ManageProducts';
import ManageOrders from './components/orders/ManageOrders';
import ManageReviews from './components/reviews/ManageReviews';

import theme from './theme';
import {Container, CssBaseline, ThemeProvider, Typography} from '@mui/material'

// import './App.css'

function App() {
  const [token, setToken] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [adminId, setAdminId] = useState('');


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

    <Container >

    <Routes>
      <Route path='/' element={<AdminHome />} />
      <Route path='/home' element={<AdminHome />} />
      <Route path='/login' element={<AdminLogin />} />
      <Route path='/users' element={<ManageUsers />} />
      <Route path='/products' element={<ManageProducts />} />
      <Route path='/orders' element={<ManageOrders />} />
      <Route path='/reviews' element={<ManageReviews />} />
      
    </Routes>
    </Container>
    </ThemeProvider>

  )
}

export default App
