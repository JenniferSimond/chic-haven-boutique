import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ItemListCard } from "./ItemListCard";
import { getToken } from "../shared/auth";
import { fetchCartItems, fetchCart } from "../../API/cart";
import Sidebar from "../shared/SideBar";
import CartSideBar from "./CartSideBar";

const CartWrapper = styled.div`
  // margin-top: 1%;
  display: flex;
  flex-direction: row;
  width: 100%;
  
`;

const CartSection = styled.div`
  // margin-top: 5%;
  width: 100%;
  min-height: 100%;
  overflow-y: hidden;
  // background-color: blue;
`;

const InnerCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 5%;
  row-gap: 0px;
  align-items: start;
  margin-left: 105px;
  max-height: 700px;
  overflow-y: auto;
  // background-color: red;
`;

const NullCart = styled.div`
  margin-top: 5%;
`;

const Cart = ({ userId }) => {
  const token = getToken();
  const [cartItems, setCartItems] = useState([]);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [userCartId, setUserCartId] = useState(null);
  const [cartDetails, setCartDetails] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const getUserCart = async () => {
      try {
        const userCart = await fetchCart(userId, token);
        setUserCartId(userCart.id);
        setCartDetails(userCart)
      } catch (error) {
        console.error('Error fetching cart', error);
      }
    };

    if (userId) {
      getUserCart();
    }
  }, [token, userId, pageRefresh]);

  useEffect(() => {
    const getCartItems = async () => {
      if (userCartId) {
        try {
          const fetchedItems = await fetchCartItems(userCartId, token);
          setCartItems(fetchedItems);
        } catch (error) {
          console.error('Error fetching items', error);
        }
      }
    };
    getCartItems();
  }, [token, pageRefresh, userCartId]);

  const refreshHandler = () => {
    setPageRefresh(!pageRefresh); // toggle opposite value
  };

  if (!token) {
    return (
      <NullCart>
        <p>Please login to view cart</p>
      </NullCart>
    );
  } else if (cartItems.length === 0) {
    return (
      <NullCart>
        <p>Cart empty!</p>
      </NullCart>
    );
  } else {
    return (
      <CartWrapper>
        <CartSection>
          <InnerCartWrapper>
            {cartItems.map((item) => (
              <ItemListCard key={item.id} item={item} refresh={refreshHandler} /> //refresh items list when new item added to cart
            ))}
          </InnerCartWrapper>
        </CartSection>
        <CartSideBar cartDetails={cartDetails} />
      </CartWrapper>
    );
  }
};

export default Cart;
