import { API_URL } from './apiConfig';

// Fetch Cart Item
const fetchCart = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const cart = await response.json();

    console.log('Cart ID (API) -->', cart);
    return cart;
  } catch (error) {
    console.error('Error fetching Cart', error);
  }
};

// Add Item to Cart

const addCartItem = async (token, userCartId, productId, quantity) => {
  try {
    const response = await fetch(`${API_URL}/carts/${userCartId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity,
      }),
    });

    const addedItem = await response.json();
    console.log('Added Cart Item (API) -->', addedItem);
    return addedItem;
  } catch (error) {
    console.error('Error adding cart item -->', error);
  }
};

// Fetch cart items by id
const fetchCartItems = async (userCartId, token) => {
  try {
    const response = await fetch(`${API_URL}/carts/${userCartId}/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const cartItems = await response.json();

    console.log('Cart ID (API) -->', cartItems);
    return cartItems;
  } catch (error) {
    console.error('Error fetching Cart', error);
  }
};

// Update Cart Item

const updateCartItem = async (itemId, quantity, token) => {
  try {
    const response = await fetch(`${API_URL}/carts/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });

    const updatedItem = await response.json();
    console.log('Updated Cart Item (API) -->', updatedItem);
    return updatedItem;
  } catch (error) {
    console.error('Error updating cart item -->', error);
  }
};

// Delete Cart Item
const deleteCartItem = async (itemId, token) => {
  const response = await fetch(`${API_URL}/carts/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

//checkout -->

const cartCheckOut = async (userId, userCartId, token) => {
  try {
    const response = await fetch(
      `${API_URL}/users/${userId}/carts/${userCartId}/checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const checkoutData = await response.json();
    console.log('Checkout response (API) -->', checkoutData);
    return checkoutData;
  } catch (error) {
    console.error('Error during cart checkout -->', error);
  }
};

export {
  fetchCart,
  addCartItem,
  fetchCartItems,
  updateCartItem,
  deleteCartItem,
  cartCheckOut,
};
