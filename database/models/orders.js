const { client } = require('../tables');
const { v4: uuidv4 } = require('uuid');

const createCustomerOrder = async ({ userId, modifiedBy }) => {
  const SQL = `
    INSERT INTO customer_orders (
        id, 
        user_id,
        total_price, 
        customer_order_status, 
        created_at,
        updated_at, 
        modified_by
    )
    VALUES (
        $1,
        $2,
        0.0, -- Setting the initial total price to zero
        'initiated',
        current_timestamp,
        current_timestamp,
        $3
    )
    RETURNING *;
  `;
  const response = await client.query(SQL, [uuidv4(), userId, modifiedBy]);
  return response.rows[0];
};

const addOrderedItems = async ({ orderId, cartItems, modifiedBy }) => {
  const orderItems = cartItems.map((item) => {
    const SQL = `
            INSERT INTO ordered_items (
                id, 
                customer_order_id,
                product_id, 
                quantity, 
                item_price, 
                total_price, 
                created_at, 
                updated_at,
                modified_by
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                current_timestamp,
                current_timestamp,
                $7
            )
            RETURNING *;
        `;
    return client.query(SQL, [
      uuidv4(),
      orderId,
      item.product_id,
      item.quantity,
      item.product_price,
      item.total_price,
      modifiedBy,
    ]);
  });
  return Promise.all(orderItems);
};

// get all orders

const fetchAllOrders = async () => {
  const SQL = `
    SELECT * FROM customer_orders;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

// get order by id
const fetchOrdersById = async ({ userId }) => {
  const SQL = `
    SELECT * FROM customer_orders WHERE user_id = $1 ;
  `;
  const response = await client.query(SQL, [userId]);
  return response.rows[0];
};

const fetchAllOrderItems = async () => {
  const SQL = `
    SELECT * FROM ordered_items;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchOrderedItemsByID = async ({ customerOrderId }) => {
  const SQL = `
    SELECT * FROM ordered_items WHERE customer_order_id = $1 ;
  `;
  const response = await client.query(SQL, [customerOrderId]);
  return response.rows[0];
};

// delete corder --> not sure if I'll use this

module.exports = {
  createCustomerOrder,
  addOrderedItems,
  fetchAllOrders,
  fetchOrdersById,
  fetchAllOrderItems,
  fetchOrderedItemsByID,
};
