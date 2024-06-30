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
import UsersHome from './components/users/UserHome';
import ManageUsers from './components/users/ManageUsers';
import Settings from './components/users/Settings';
import MiniDrawer from './components/menu/MiniDrawer';
import theme from './theme'
import {Box, Container, CssBaseline, ThemeProvider} from '@mui/material'



function App() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [adminRole, setAdminRole] = useState('');
  const [adminId, setAdminId] = useState('');
 
  const navigate = useNavigate()
 



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {location.pathname !== '/login' && <MiniDrawer open={drawerOpen} setOpen={setDrawerOpen} />}
    <Box component='main' sx={{ flexFlow: 1, p:3, marginLeft: drawerOpen ? '240px' : '58px', transition: 'margin 300ms'}}>

    <Routes>
      {/* login is the only public route in admin portal */}
      <Route path='/login' element={<AdminLogin setAdminRole={setAdminRole} setAdminId={setAdminId}/>} />

      <Route path='/' element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
      <Route path='/home' element={ <ProtectedRoute><AdminHome /></ProtectedRoute>} />
      <Route path='/users' element={<ProtectedRoute><UsersHome /></ProtectedRoute>} />
      <Route path='/users/:userId/edit' element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
      <Route path='/products' element={<ProtectedRoute><ProductsHome /></ProtectedRoute>} />
      <Route path='/products/:productId/edit' element={<ProtectedRoute><ManageProduct /></ProtectedRoute>} />
      <Route path='/orders' element={<ProtectedRoute><ManageOrders /></ProtectedRoute>} />
      <Route path='/reviews' element={<ProtectedRoute><ManageReviews /></ProtectedRoute>} />
      <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
    </Routes>
    </Box>
    </ThemeProvider>

  )
}

export default App
