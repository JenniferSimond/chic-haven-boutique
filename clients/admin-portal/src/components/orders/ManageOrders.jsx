import React, { useState, useEffect } from 'react';
import { getAdminToken } from '../../shared/adminAuth';
import OrderList from './OrderList';
import { fetchAllOrders } from '../../API/orders';
import { Box, Container, Typography, Pagination } from '@mui/material';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [ordersPerPage] = useState(10);

  useEffect(() => {
    const token = getAdminToken();
    const getOrders = async () => {
      try {
        const fetchedOrders = await fetchAllOrders(token);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    getOrders();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastOrder = page * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="h3">Customer Orders</Typography>
      </Box>
      <Box sx={{ mt: 2, height: '70vh', overflowY: 'scroll' }}>
        <OrderList orders={currentOrders} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(orders.length / ordersPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default ManageOrders;

