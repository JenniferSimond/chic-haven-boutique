// import React, { useState } from 'react';
// import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
// import { cartCheckOut } from '../../API/cart';
// import { getToken } from '../shared/auth';

// const StripeCheckoutForm = ({ userId, userCartId }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState('');
//   const [paymentSuccessful, setPaymentSuccessful] = useState(false);

//   const token = getToken();

//   const handlePaymentSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: 'http://localhost:5173/home',
//       }
//     });

//     if (error) {
//       setErrorMessage(error.message);
//     } else if (paymentIntent.status === 'succeeded') {
   
//       await cartCheckOut(userId, userCartId, token);
//       setPaymentSuccessful(true);
//     }
//   };

//   return (
//     <form onSubmit={handlePaymentSubmit}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//       {errorMessage && <div>{errorMessage}</div>}
//       {paymentSuccessful && <div>Payment Succeeded! Your order is being processed.</div>}
//     </form>
//   );
// };

// export default StripeCheckoutForm;


//TRY TWO --> NOT DOING CHECKOUT


// import React, { useState, useEffect } from 'react';
// import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
// import { cartCheckOut } from '../../API/cart.js';
// import { getToken } from '../shared/auth';

// const StripeCheckoutForm = ({ userId, userCartId, clientSecret }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState('');
//   const [paymentSuccessful, setPaymentSuccessful] = useState(false);

//   console.log('userId (stripeForm) -->', userId);
//     console.log('userCartId (stripeForm) -->', userCartId)
//   const handlePaymentSubmit = async (event) => {
    
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: 'http://localhost:5173/cart/checkout',
//       }
//     });

//     if (error) {
//       setErrorMessage(error.message);
//     } else if (paymentIntent.status === 'succeeded') {
//       await cartCheckOut(userId, userCartId, getToken());
//       setPaymentSuccessful(true);
//     }
//   };

//   return (
//     <form onSubmit={handlePaymentSubmit}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//       {errorMessage && <div>{errorMessage}</div>}
//       {paymentSuccessful && <div>Payment Succeeded! Your order is being processed.</div>}
//     </form>
//   );
// };

// export default StripeCheckoutForm;

import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { cartCheckOut } from '../../API/cart';
import { getToken } from '../shared/auth';

const StripeCheckoutForm = ({ userId, userCartId, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  console.log('userId (stripeForm) -->', userId);
  console.log('userCartId (stripeForm) -->', userCartId);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // No need for return_url
      },
      redirect: 'if_required', // Add this line
    });

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      await cartCheckOut(userId, userCartId, getToken());
      setPaymentSuccessful(true);
      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {errorMessage && <div>{errorMessage}</div>}
      {paymentSuccessful && <div>Payment Succeeded! Your order is being processed.</div>}
    </form>
  );
};

export default StripeCheckoutForm;
