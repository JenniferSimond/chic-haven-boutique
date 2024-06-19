import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchCartItems, updateCartItem, deleteCartItem } from "../../API/cart";

const CartWrapper = styled.div`
    display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   row-gap: 45px;
   column-gap: 40px;
   justify-content: flex-start;  // Aligns items to the left
   align-content: flex-start;
   width: 90%;  
   max-height: 700px;
   overflow-y: auto;
   margin-left: 90px;
    margin-top: 25px;
`;

const InnerCartWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const CartItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;


const ItemImageCard = styled.div`
  width: 25px;
  height: 25px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
`;

const Button = styled.button`

`;



const Cart = ({ userCartId, token}) => {
    console.log('Token from Cart -->', token)
    console.log('Cart ID (cart 1)', userCartId)
    const [cartItems, setCartItems] = useState([]);
    
    const [pageRefresh, setPageRefresh] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
     
        console.log('CartId (cart.jsx)-->', userCartId)
        const getCartItems = async () => {
            try {
                const fetchedItems = await fetchCartItems(userCartId, token);
                console.log('Fetched Items (cart) -->',fetchedItems);
                setCartItems(fetchedItems)
            } catch (error) {
                console.error('Error fetching items')
            }
        }
        getCartItems()
    }, [ token, ])

    return(
      <CartWrapper>
        <InnerCartWrapper>
            
        </InnerCartWrapper>
      </CartWrapper>
    );
}

export default Cart;