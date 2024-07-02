import { API_URL } from './adminApiConfig';

async function fetchAllUsers(token) {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Users not found');
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

async function fetchUserById(userId, token) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Customer not found');
    }

    const customer = await response.json();
    return customer;
  } catch (error) {
    console.error('Error fetching customer:', error);
  }
}

//update user

async function updateUser(userId, userNewData, token) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userNewData),
    });

    if (!response.ok) {
      throw new Error('User not found');
    }

    const updatedUserDetails = await response.json();
    return updatedUserDetails;
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

//delete user
async function deleteUser(userId, token) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error deleting user');
    }

    return response.status;
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

export { fetchAllUsers, fetchUserById, updateUser, deleteUser };
