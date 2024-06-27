// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import StripeCheckoutForm from './StripeCheckoutForm';
// import { createPaymentIntent } from '../../API/stripe';
// import { fetchCart } from '../../API/cart';
// import { getToken } from '../shared/auth';

// const stripePromise = loadStripe('pk_test_51PW06KEFbQzMVIJeWuucCm7qlmJfto3TuXbMe6kS241ugUCD23syoh7O2SDhjQ5wOCP3zHitNnHaEdG6xZ3NkH5e00Zz0mOFUt');

// const CheckoutWrapper = styled.div`
//   margin-top: 5%;
// `;

// const CheckOut = ({ userId, userCartId }) => {
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     const fetchCartAndCreateIntent = async () => {
//       const token = getToken();
//       const cart = await fetchCart(userId, token);
//       const secret = await createPaymentIntent(cart.cart_total * 100);
//       setClientSecret(secret);
//     };

//     fetchCartAndCreateIntent();
//   }, [userId, userCartId]); // Add userCartId to dependency array to trigger effect when it changes

//   if (!clientSecret) {
//     return <div>Loading...</div>;
//   }

//   const options = {
//     clientSecret
//   };

//   return (
//     <CheckoutWrapper>
//       <Elements stripe={stripePromise} options={options}>
//         <StripeCheckoutForm userId={userId} userCartId={userCartId} />
//       </Elements>
//     </CheckoutWrapper>
//   );
// };

// export default CheckOut;





// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import StripeCheckoutForm from './StripeCheckoutForm';
// import { createPaymentIntent } from '../../API/stripe';
// import { fetchCart } from '../../API/cart.js';
// import { getToken } from '../shared/auth';

// const stripePromise = loadStripe('pk_test_51PW06KEFbQzMVIJeWuucCm7qlmJfto3TuXbMe6kS241ugUCD23syoh7O2SDhjQ5wOCP3zHitNnHaEdG6xZ3NkH5e00Zz0mOFUt');

// const CheckoutWrapper = styled.div`
//   margin-top: 5%;
// `;

// const CheckOut = ({ userId, userCartId }) => {
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     const fetchCartAndCreateIntent = async () => {
//       const token = getToken();
//       const cart = await fetchCart(userId, token);
//       const secret = await createPaymentIntent(cart.cart_total * 100);
//       setClientSecret(secret);
//     };

//     fetchCartAndCreateIntent();
//   }, [userId]);

//   if (!clientSecret) {
//     return <div>Loading...</div>;
//   }

//   const options = {
//     clientSecret
//   };

//   return (
//     <CheckoutWrapper>
//       <Elements stripe={stripePromise} options={options}>
//         <StripeCheckoutForm userId={userId} userCartId={userCartId} clientSecret={clientSecret} />
//       </Elements>
//     </CheckoutWrapper>
//   );
// };

// export default CheckOut;






// CheckOut.jsx
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import StripeCheckoutForm from './StripeCheckoutForm';
// import { createPaymentIntent } from '../../API/stripe';
// import { fetchCart } from '../../API/cart';
// import { getToken } from '../shared/auth';

// const stripePromise = loadStripe('pk_test_51PW06KEFbQzMVIJeWuucCm7qlmJfto3TuXbMe6kS241ugUCD23syoh7O2SDhjQ5wOCP3zHitNnHaEdG6xZ3NkH5e00Zz0mOFUt');

// const CheckoutWrapper = styled.div`
//   margin-top: 5%;
// `;

// const CheckOut = ({ userId, userCartId }) => {
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     const fetchCartAndCreateIntent = async () => {
//       const token = getToken();
//       const cart = await fetchCart(userId, token);
//       const secret = await createPaymentIntent(cart.cart_total * 100);
//       setClientSecret(secret);
//     };

//     fetchCartAndCreateIntent();
//   }, [userId]);

//   if (!clientSecret) {
//     return <div>Loading...</div>;
//   }

//   const options = {
//     clientSecret
//   };

//   return (
//     <CheckoutWrapper>
//       <Elements stripe={stripePromise} options={options}>
//         <StripeCheckoutForm userId={userId} userCartId={userCartId} clientSecret={clientSecret} />
//       </Elements>
//     </CheckoutWrapper>
//   );
// };

// export default CheckOut;



import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';
import { createPaymentIntent } from '../../API/stripe';
import { fetchCart, cartCheckOut } from '../../API/cart';
import { getToken } from '../shared/auth';
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51PW06KEFbQzMVIJeWuucCm7qlmJfto3TuXbMe6kS241ugUCD23syoh7O2SDhjQ5wOCP3zHitNnHaEdG6xZ3NkH5e00Zz0mOFUt');

const CheckoutWrapper = styled.div`
  margin-top: 5%;
`;

const CheckOut = ({ userId, userCartId }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartAndCreateIntent = async () => {
      const token = getToken();
      const cart = await fetchCart(userId, token);
      const secret = await createPaymentIntent(cart.cart_total * 100);
      setClientSecret(secret);
    };

    fetchCartAndCreateIntent();
  }, [userId]);

  const handlePaymentSuccess = async () => {
    const token = getToken();
    // await cartCheckOut(userId, userCartId, token);
    setPaymentSuccessful(true);
    navigate('/cart')
  };

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  const options = {
    clientSecret
  };

  return (
    <CheckoutWrapper>
      <Elements stripe={stripePromise} options={options}>
        <StripeCheckoutForm userId={userId} userCartId={userCartId} onPaymentSuccess={handlePaymentSuccess} />
      </Elements>
      {paymentSuccessful && <div>Payment and Checkout Succeeded! Your order is being processed.</div>}
    </CheckoutWrapper>
  );
};

export default CheckOut;



