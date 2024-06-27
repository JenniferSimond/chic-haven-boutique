import { API_URL } from './apiConfig';

const createPaymentIntent = async (amount) => {
  try {
    const response = await fetch(`${API_URL}/stripe/process-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    const paymentData = await response.json();
    if (paymentData.clientSecret) {
      return paymentData.clientSecret;
    } else {
      throw new Error('Client secret not received');
    }
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export { createPaymentIntent };
