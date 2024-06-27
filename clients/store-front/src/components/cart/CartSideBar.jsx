import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
  width: 20%;
  min-height: 80vh;
  background-color: #ffbc42;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const CartDetailsContainer = styled.div`
display: flex;
flex-direction: column;
// justify-content: center;
align-items: center;
padding-top: 10%;
width: 80%;
min-height: 20%;
background-color: #F9F5E3;
border-radius: 5px;
gap: 50px;
`;

const CheckOutButton = styled.button`

`;



const CartSideBar = ({cartDetails}) => {
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate('/cart/checkout')
  }
console.log('Cart Details (CartSide) -->', cartDetails)
    
return(
    <SidebarWrapper>
      <CartDetailsContainer>
        <p>{`Cart Total: $${cartDetails.cart_total}`}</p>
        <CheckOutButton onClick={handleCheckoutClick}>Checkout</CheckOutButton>
      </CartDetailsContainer>
    </SidebarWrapper>
)
}

export default CartSideBar


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// const SidebarWrapper = styled.div`
//   width: 20%;
//   min-height: 80vh;
//   background-color: #ffbc42;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
//   align-items: center;
// `;

// const CartDetailsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 10%;
//   width: 80%;
//   min-height: 20%;
//   background-color: #F9F5E3;
//   border-radius: 5px;
//   gap: 50px;
// `;

// const CheckOutButton = styled.button`
//   // Add button styling here
// `;

// const CartSideBar = ({ cartDetails, refresh }) => {
//   const navigate = useNavigate();

//   const handleCheckoutClick = () => {
//     navigate('/cart/checkout');
//     refresh(); // Refresh the cart after navigating to checkout
//   };

//   console.log('Cart Details (CartSide) -->', cartDetails);

//   return (
//     <SidebarWrapper>
//       <CartDetailsContainer>
//         <p>{`Cart Total: $${cartDetails.cart_total}`}</p>
//         <CheckOutButton onClick={handleCheckoutClick}>Checkout</CheckOutButton>
//       </CartDetailsContainer>
//     </SidebarWrapper>
//   );
// };

// export default CartSideBar;
