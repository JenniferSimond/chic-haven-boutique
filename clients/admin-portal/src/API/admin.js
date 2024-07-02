import { API_URL } from './adminApiConfig';

// Register a new admin
const registerAdmin = async (adminData, token) => {
  try {
    const response = await fetch(`${API_URL}/admins/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(adminData),
    });

    const newAdmin = await response.json();
    console.log('New Admin (API) -->', newAdmin);
    return newAdmin;
  } catch (error) {
    console.error('Error registering new admin', error);
  }
};

// Admin login
const adminLogin = async (loginData) => {
  try {
    const response = await fetch(`${API_URL}/admins/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const adminData = await response.json();
    console.log('Admin Login >--(API)-->', adminData);
    return adminData;
  } catch (error) {
    console.error('Login Error:', error);
  }
};

// Fetch all admins
const fetchAllAdmins = async (token) => {
  try {
    const response = await fetch(`${API_URL}/admins`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const admins = await response.json();
    console.log('Admins (API) -->', admins);
    return admins;
  } catch (error) {
    console.error('Error fetching admins', error);
  }
};

// Fetch admin by ID
const fetchAdminById = async (adminId, token) => {
  try {
    const response = await fetch(`${API_URL}/admins/${adminId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const admin = await response.json();
    console.log('Admin (API) -->', admin);
    return admin;
  } catch (error) {
    console.error('Error fetching admin by ID', error);
  }
};

// Update admin
const updateAdmin = async (adminId, adminData, token) => {
  try {
    const response = await fetch(`${API_URL}/admins/${adminId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(adminData),
    });

    const updatedAdmin = await response.json();
    console.log('Updated Admin (API) -->', updatedAdmin);
    return updatedAdmin;
  } catch (error) {
    console.error('Error updating admin', error);
  }
};

// Delete admin
const deleteAdmin = async (adminId, token) => {
  try {
    const response = await fetch(`${API_URL}/admins/${adminId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      console.log('Admin deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting admin', error);
  }
};

export {
  registerAdmin,
  adminLogin,
  fetchAllAdmins,
  fetchAdminById,
  updateAdmin,
  deleteAdmin,
};
