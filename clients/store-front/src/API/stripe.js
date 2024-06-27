import { API_URL } from './apiConfig';

const createStripePaymentIntent = async (paymentMethodId, amount) => {
  try {
    const response = await fetch(`${API_URL}/stripe/process-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId,
        amount,
      }),
    });

    const paymentData = await response.json();
    console.log('Stripe paymentData (API) -->', paymentData);
    return paymentData;
  } catch (error) {
    console.error('Error processing payment:', error);
    return { error: error.message };
  }
};

export { createStripePaymentIntent };
