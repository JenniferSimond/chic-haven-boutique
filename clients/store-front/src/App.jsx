import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import HomePage from "./components/appHome/HomePage"
import About from "./components/appHome/About"
import Register from "./components/appHome/Register"
import Wishlist from "./components/User/Wishlist"
import Login from "./components/User/Login"
import UserAccount from "./components/User/UserAccount"
import Products from './components/products/products'
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
    margin-left: 105px;
    flex-grow: 1;
`
function App() {
// TOKEN --> Passed down to children that need user authentication -->
// Remember --> PROPS are like Parameters 

  const [token, setToken] = useState('');
  return (
    <AppWrapper>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route path="/account" element={<UserAccount token={token}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </MainContent>
      <Footer />
    </AppWrapper>
  );
}

export default App
