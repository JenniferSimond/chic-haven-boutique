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
 
`;

const InnerWrapper = styled.div` 
    display: flex;
    justify-content: center;
    min-height: 100%;
    // background-color: red;
    margin-top: 5.8%;
    margin-bottom: 4.7%;
   
    z-index: 2;
    // flex-grow: 1;
`
function App() {
// TOKEN --> Passed down to children that need user authentication --> // -UPDATE TO STORE TOKEN IN STOREAGE LATER
// UserId --> Passed down to children that need UserId -->
// Remember --> PROPS are like Parameters 
  const [userId, setUserId] = useState('');
  const [userCartId, setUserCartId] = useState('');
  
  
  console.log('USER ID APP -->',userId);
  console.log('CART ID --> ', userCartId)

  return (
    <AppWrapper>
      <Header />
      <InnerWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/account" element={<UserAccount setUserId={setUserId} setUserCartId={setUserCartId} />} />
          <Route path="/cart" element={<Cart userId={userId} userCartId={userCartId} />} />
          <Route path="/wishlist" element={<Wishlist userId={userId}/>} />
          <Route path="/products" element={<Products userCartId={userCartId} />} />
          <Route path="/products/:productId" element={<Product userCartId={userCartId} />} />
        </Routes>
      </InnerWrapper>
      <Footer />
    </AppWrapper>
  );
}

export default App
