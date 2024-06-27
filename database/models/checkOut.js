const { client } = require('../tables');
const { v4: uuidv4 } = require('uuid');
const { createCustomerOrder, addOrderedItems } = require('./orders');
const { fetchCartItemsById } = require('./cart');

// const cartCheckOut = async (userId, cartId, modifiedBy) => {
//   console.log('Checkout initiated for user:', { userId, cartId, modifiedBy });

//   // Fetch the cart items
//   const cartItems = await fetchCartItemsById(cartId);
//   console.log('Fetched cart items:', cartItems);

//   if (cartItems.length === 0) {
//     throw new Error('Cart is empty');
//   }

//   // Create a customer order
//   const order = await createCustomerOrder({
//     userId,
//     modifiedBy,
//   });
//   console.log('Created order:', order);

//   // Add ordered items
//   await addOrderedItems({
//     orderId: order.id,
//     cartItems,
//     modifiedBy,
//   });
//   console.log('Added ordered items');

//   // Clear the cart
//   const clearCartSQL = `DELETE FROM cart_items WHERE customer_cart_id = $1`;
//   await client.query(clearCartSQL, [cartId]);
//   console.log('Cleared cart items');

//   return order;
// };

// const cartCheckOut = async (userId, cartId, modifiedBy) => {
//   console.log('Checkout initiated for user:', { userId, cartId, modifiedBy });

//   // Fetch the cart items
//   const cartItems = await fetchCartItemsById(cartId);
//   console.log('Fetched cart items:', cartItems);

//   if (cartItems.length === 0) {
//     throw new Error('Cart is empty');
//   }

//   // Create a customer order
//   const order = await createCustomerOrder({
//     userId,
//     modifiedBy,
//   });
//   console.log('Created order:', order);

//   // Add ordered items
//   await addOrderedItems({
//     orderId: order.id,
//     cartItems,
//     modifiedBy,
//   });
//   console.log('Added ordered items');

//   // Clear the cart
//   const clearCartSQL = `DELETE FROM cart_items WHERE customer_cart_id = $1 RETURNING *`;
//   const clearedItems = await client.query(clearCartSQL, [cartId]);
//   console.log('Cleared cart items:', clearedItems.rows);

//   return order;
// };

const cartCheckOut = async (userId, cartId, modifiedBy) => {
  console.log('Checkout initiated for user:', { userId, cartId, modifiedBy });

  // Fetch the cart items
  const cartItems = await fetchCartItemsById(cartId);
  console.log('Fetched cart items:', cartItems);

  if (cartItems.length === 0) {
    throw new Error('Cart is empty');
  }

  // Create a customer order
  const order = await createCustomerOrder({
    userId,
    modifiedBy,
  });
  console.log('Created order:', order);

  // Add ordered items
  await addOrderedItems({
    orderId: order.id,
    cartItems,
    modifiedBy,
  });
  console.log('Added ordered items');

  // Clear the cart
  const clearCartSQL = `DELETE FROM cart_items WHERE customer_cart_id = $1 RETURNING *`;
  const clearedItems = await client.query(clearCartSQL, [cartId]);
  console.log('Cleared cart items:', clearedItems.rows); // Check if any rows were deleted

  // Check if cart status is updated
  const checkCartSQL = `SELECT * FROM customer_cart WHERE id = $1`;
  const updatedCart = await client.query(checkCartSQL, [cartId]);
  console.log('Updated cart details:', updatedCart.rows); // Check the cart status and total

  return order;
};

module.exports = {
  cartCheckOut,
};
