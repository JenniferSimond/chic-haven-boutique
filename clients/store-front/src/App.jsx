import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/appHome/HomePage";
import About from "./components/appHome/About";
import Register from "./components/appHome/Register";
import Wishlist from "./components/User/Wishlist";
import Login from "./components/User/Login";
import UserAccount from "./components/User/UserAccount";
import Products from './components/products/products';
import Product from './components/products/Product';
import Cart from "./components/cart/Cart";
import CheckOut from './components/cart/CheckOut';
import Header from "./components/navBar/Header";
import Footer from "./components/footer/Footer";
import { getToken } from "./components/shared/auth";
import { getUserDetails } from "./API/user";
import { fetchCart } from "./API/cart";

import styled from "styled-components";

const AppWrapper = styled.div``;

const InnerWrapper = styled.div` 
  display: flex;
  justify-content: center;
  min-height: 100%;
  margin-top: 5.8%;
  margin-bottom: 4.7%;
  z-index: 2;
`;
//needed to store cartId and userId globally to account for browser refresh
// cart fetches data seperatley to re-render when cart is updated
function App() {
  const [userId, setUserId] = useState('');
  const [userCartId, setUserCartId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      const token = getToken();
      if (token) {
        try {
          const userDetails = await getUserDetails(token);
          setUserId(userDetails.id);
          console.log('UserDeets (APP)-->',userDetails)
          const userCart = await fetchCart(userDetails.id, token);
          setUserCartId(userCart.id);
        } catch (error) {
          console.error('Error initializing user', error);
          navigate('/login');
        }
      } 
    };

    initializeUser();
  }, [navigate]);

  console.log('USER ID (APP) -->', userId);
  console.log('CART (ID) --> ', userCartId);

  return (
    <AppWrapper>
      <Header />
      <InnerWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<Register setUserId={setUserId} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setUserId={setUserId} />} />
          <Route path="/account" element={<UserAccount userId={userId} />} />
          <Route path="/cart" element={<Cart userId={userId} />} />
          <Route path="/cart/checkout" element={<CheckOut userId={userId} userCartId={userCartId} />} />
          <Route path="/wishlist" element={<Wishlist userId={userId} />} />
          <Route path="/products" element={<Products userCartId={userCartId} />} />
          <Route path="/products/:productId" element={<Product userCartId={userCartId} userId={userId}/>} />
         
        </Routes>
      </InnerWrapper>
      <Footer />
    </AppWrapper>
  );
}

export default App;

