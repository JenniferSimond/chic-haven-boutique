import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import HomePage from "./components/appHome/HomePage"
import About from "./components/appHome/About"
import Register from "./components/appHome/Register"
import Wishlist from "./components/User/Wishlist"
import Login from "./components/User/Login"
import UserAccount from "./components/User/UserAccount"
import Products from './components/products/products'
import Product from './components/products/Product'
import Cart from "./components/cart/Cart"
import Header from "./components/navBar/Header"
import Footer from "./components/footer/Footer"
import styled from "styled-components"

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh
`;

const MainContent = styled.main`
    margin-top: 0px;
    margin-left: 0px;
    flex-grow: 1;
`
function App() {
// TOKEN --> Passed down to children that need user authentication --> // -UPDATE TO STORE TOKEN IN STOREAGE LATER
// UserId --> Passed down to children that need UserId -->
// Remember --> PROPS are like Parameters 
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userCartId, setUserCartId] = useState('');
  
  console.log('TOKEN APP -->',token);
  console.log('USER ID APP -->',userId);
  console.log('CART ID --> ', userCartId)

  return (
    <AppWrapper>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login  setToken={setToken} />} />
          <Route path="/account" element={<UserAccount token={token} setUserId={setUserId} setUserCartId={setUserCartId} />} />
          <Route path="/cart" element={<Cart userId={userId}  token={token} userCartId={userCartId} />} />
          <Route path="/wishlist" element={<Wishlist userId={userId}/>} />
          <Route path="/products" element={<Products userCartId={userCartId} />} />
          <Route path="/products/:productId" element={<Product token={token} userCartId={userCartId} />} />
        </Routes>
      </MainContent>
      <Footer />
    </AppWrapper>
  );
}

export default App
