import { API_URL } from './apiConfig';

const customerLogin = async (loginCredentials) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginCredentials),
    });

    const userData = await response.json();
    console.log('Data From API -->', userData);
    return userData;
  } catch (error) {
    console.error('Login Error', error);
  }
};

export { customerLogin };

// admin login
