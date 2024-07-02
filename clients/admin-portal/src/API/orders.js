import { API_URL } from './adminApiConfig';

// Fetch all orders
const fetchAllOrders = async (token) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const orders = await response.json();
    console.log('Orders (API) -->', orders);
    return orders;
  } catch (error) {
    console.error('Error fetching all orders', error);
  }
};

// Fetch orders by user ID
const fetchOrdersByUserId = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const userOrders = await response.json();
    console.log('User Orders (API) -->', userOrders);
    return userOrders;
  } catch (error) {
    console.error(`Error fetching orders for user ${userId}`, error);
  }
};

// Fetch order items by order ID
const fetchOrderItems = async (orderId, token) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const orderItems = await response.json();
    console.log('Order Items (API) -->', orderItems);
    return orderItems;
  } catch (error) {
    console.error(`Error fetching items for order ${orderId}`, error);
  }
};

// Update order status
const updateOrderStatus = async (orderId, newStatus, token) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newStatus),
    });
    const updatedOrder = await response.json();
    console.log('Updated Order (API) -->', updatedOrder);
    return updatedOrder;
  } catch (error) {
    console.error(`Error updating status for order ${orderId}`, error);
  }
};

// Delete an order
const deleteOrder = async (orderId, token) => {
  try {
    await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Deleted Order (API) --> ${orderId}`);
  } catch (error) {
    console.error(`Error deleting order ${orderId}`, error);
  }
};

// Delete an order item
const deleteOrderItem = async (orderId, itemId, token) => {
  try {
    await fetch(`${API_URL}/orders/${orderId}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Deleted Order Item (API) --> ${itemId} from order ${orderId}`);
  } catch (error) {
    console.error(`Error deleting item ${itemId} from order ${orderId}`, error);
  }
};

export {
  fetchAllOrders,
  fetchOrdersByUserId,
  fetchOrderItems,
  updateOrderStatus,
  deleteOrder,
  deleteOrderItem,
};
