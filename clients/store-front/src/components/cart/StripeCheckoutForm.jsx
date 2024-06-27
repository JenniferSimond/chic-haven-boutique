import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createStripePaymentIntent } from '../../API/stripe';
import { fetchCart, cartCheckOut } from '../../API/cart';
import { getToken } from '../shared/auth';

const StripeCheckOutForm = ({ userId, userCartId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [amount, setAmount] = useState(0);
  const token = getToken();

  useEffect(() => {
    const fetchCartTotal = async () => {
      try {
        const checkoutCart = await fetchCart(userId, token);
        console.log(checkoutCart);
        setAmount(checkoutCart.cart_total * 100); // Assuming cart_total is in dollars, converting to cents
      } catch (error) {
        console.error('Error fetching cart total:', error);
        setErrorMessage('Failed to fetch cart total.');
      }
    };

    fetchCartTotal();
  }, [userId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      const paymentResult = await createStripePaymentIntent(paymentMethod.id, amount);
      console.log('Payment Method (StripeCheckoutForm) -->',paymentMethod)
      console.log('payment method ID --->',paymentMethod.id )
      console.log('Amount', amount)

      if (paymentResult.error) {
        setErrorMessage(paymentResult.error);
      } else {
        // Proceed with cart checkout in the database
        await cartCheckOut(userId, userCartId, token);
        setPaymentSuccessful(true);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrorMessage('Payment processing failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {errorMessage && <div>{errorMessage}</div>}
      {paymentSuccessful && <div>Payment Succeeded! Your order is being processed.</div>}
    </form>
  );
};

export default StripeCheckOutForm;
