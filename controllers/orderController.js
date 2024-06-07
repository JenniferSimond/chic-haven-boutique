const express = require('express');
const router = express('router');

const {
  fetchAllOrders,
  fetchOrdersById,
  fetchAllOrderItems,
  fetchOrderedItemsByID,
  deleteOrderdItem,
  updateCustomerOrderStatus,
} = require('../database/index.js');

const {
  isAuthenticated,
  isAuthorizedCustomer,
} = require('./shared/userAuth.js');

// ** orders created in checkout checkout --> see cart controller

// fetch all orders

router.get(
  '/users/:id/orders',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const orders = await fetchAllOrders();
      if (!orders) {
        return res.status(404).json({ message: 'Oder Not Found' });
      }
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

// fetch orders by id

router.get(
  '/orders/:id',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      userId = req.params.id;
      const customerOrders = await fetchOrdersById(userId);

      if (!customerOrders) {
        return res.status(404).json({ message: 'Order Not Found' });
      }
      res.json(customerOrders);
    } catch (error) {
      next(error);
    }
  }
);

// fetch ordered item
router.get(
  '/orders/:order_id/items',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      customerOrderId = req.params.order_id;
      const orderedItems = await fetchOrderedItemsByID(customerOrderId);

      if (!orderedItems) {
        return res.status(404).json({ message: 'Item Not Found' });
      }
      res.json(orderedItems);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/orders/:id',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const customerOrderId = req.params.id;
      const newOrderStatus = req.body;
      const modifiedBy = req.user.id;

      const updatedOrder = await updateCustomerOrderStatus({
        customerOrderId,
        newOrderStatus,
        modifiedBy,
      });

      res.status(201).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/orders/:id', async (req, res, next) => {
  try {
    const customerOrderId = req.params.id;
    await deleteCustomerOrder({ customerOrderId });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/orders/:order_id/items/:item_id',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const customerOrderId = req.params.order_id;
      const itemId = req.params.item_id;

      await deleteOrderdItem({ customerOrderId, itemId });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
