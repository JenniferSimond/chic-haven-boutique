import React, { useState, useEffect } from 'react';
import { getAdminToken } from './shared/adminAuth';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminHome from './components/admin-user/AdminHome';
import AdminLogin from './components/admin-user/AdminLogin';
import ManageAdmins from './components/users/ManageUsers';
import ProductsHome from './components/products/ProductsHome';
import ManageProduct from './components/products/ManageProduct';
import ManageOrders from './components/orders/ManageOrders';
import ManageReviews from './components/reviews/ManageReviews';
import Settings from './components/users/Settings';
import MiniDrawer from './components/menu/MiniDrawer';
import theme from './theme'
import {Container, CssBaseline, ThemeProvider} from '@mui/material'



function App() {
  const location = useLocation();
  const [adminRole, setAdminRole] = useState('');
  const [adminId, setAdminId] = useState('');
 
  const navigate = useNavigate()
 



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {location.pathname !== '/login' && <MiniDrawer />}
    <Container >

    <Routes>
      {/* login is the only public route in admin portal */}
      <Route path='/login' element={<AdminLogin setAdminRole={setAdminRole} setAdminId={setAdminId}/>} />

      <Route path='/' element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
      <Route path='/home' element={ <ProtectedRoute><AdminHome /></ProtectedRoute>} />
      <Route path='/users' element={<ProtectedRoute><ManageAdmins /></ProtectedRoute>} />
      <Route path='/products' element={<ProtectedRoute><ProductsHome /></ProtectedRoute>} />
      <Route path='/products/:productId/edit' element={<ProtectedRoute><ManageProduct /></ProtectedRoute>} />
      <Route path='/orders' element={<ProtectedRoute><ManageOrders /></ProtectedRoute>} />
      <Route path='/reviews' element={<ProtectedRoute><ManageReviews /></ProtectedRoute>} />
      <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
    </Routes>
    </Container>
    </ThemeProvider>

  )
}

export default App
