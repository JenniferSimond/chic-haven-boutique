import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ItemListCard } from "./ItemListCard";
import { fetchCartItems, updateCartItem, deleteCartItem } from "../../API/cart";

const CartSection = styled.div`
    margin-top: 0px;
    max-width: 100%;
    min-height: 100%;
    background-color: red;
    overflow-y: hidden;
    
    
`

const InnerCartWrapper = styled.div`
 display: flex;
 flex-direction: column;
 row-gap: 30px;
 align-items: start;
 margin-left: 105px;
 margin-top: 25px;
 max-height: 700px;
 overflow-y: auto;
`;




const Cart = ({ userCartId, token}) => {
    console.log('Token from Cart -->', token)
    console.log('Cart ID (cart 1)', userCartId)
    const [cartItems, setCartItems] = useState([]);
    const [carId, setCarId] = useState('')
    const [pageRefresh, setPageRefresh] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // come back and setup a logic for please log in

    useEffect(() => {
        
     
        console.log('CartId (cart.jsx)-->', userCartId)
        const getCartItems = async () => {
           
            try {
                if (!token){
                   navigate('/login')
                }
                const fetchedItems = await fetchCartItems(userCartId, token);
                console.log('CartItems (cart) -->',fetchedItems);
                setCartItems(fetchedItems)
            } catch (error) {
                console.error('Error fetching items')
            }
        }
        getCartItems()
    }, [ token])

    return(
      <CartSection>
        <h1>Cart</h1>
        <InnerCartWrapper>
            {cartItems.map(item => (
                <ItemListCard key={item.id} item={item} />
            ))}
        </InnerCartWrapper>
      </CartSection>
    );
}

export default Cart;