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
    console.log('Data From (API) -->', userData);
    return userData;
  } catch (error) {
    console.error('Login Error', error);
  }
};

const getUserDetails = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await response.json();
    console.log('User Details (API) -->', user);
    return user;
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
};

const customerSignup = async (registrationData) => {
  try {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });
    const newUser = await response.json();
    console.log('New User (API) -->', newUser);
    return newUser;
  } catch (error) {
    console.error('Signup error:', error);
  }
};

export { customerLogin, getUserDetails, customerSignup };
