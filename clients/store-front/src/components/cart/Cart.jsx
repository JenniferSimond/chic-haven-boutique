import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ItemListCard } from "./ItemListCard";
import { getToken } from "../shared/auth";
import { fetchCartItems } from "../../API/cart";
import Sidebar from "../shared/SideBar";
import CartSideBar from "./CartSideBar";

const CartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const CartSection = styled.div`
  margin-top: 0%;
  width: 100%;
  min-height: 100%;
  overflow-y: hidden;
`;

const InnerCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: start;
  margin-left: 105px;
  max-height: 700px;
  overflow-y: auto;
`;

const NullCart = styled.div`
  margin-top: 5%;
`;

const Cart = ({ userCartId }) => {
  const token = getToken();
  console.log('Token from Cart -->', token);
  console.log('Cart ID (cart 1)', userCartId);
  const [cartItems, setCartItems] = useState([]);
  const [pageRefresh, setPageRefresh] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const fetchedItems = await fetchCartItems(userCartId, token);
        console.log('CartItems (cart) -->', fetchedItems);
        setCartItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching items', error);
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
              <ItemListCard key={item.id} item={item} refresh={refreshHandler} />
            ))}
          </InnerCartWrapper>
        </CartSection>
        <CartSideBar />
      </CartWrapper>
    );
  }
};

export default Cart;
