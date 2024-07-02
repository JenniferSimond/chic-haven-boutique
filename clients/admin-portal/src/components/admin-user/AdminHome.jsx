import React, { useState, useEffect } from 'react';
import { getAdminToken } from '../../shared/adminAuth';
import { fetchAllUsers } from '../../API/users';
import { fetchAllProducts } from '../../API/products';
import { fetchAllReviews } from '../../API/reviews';
import { fetchAllOrders } from '../../API/orders';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AdminHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const token = getAdminToken();

    const fetchData = async () => {
      try {
        const [users, products, reviews, orders] = await Promise.all([
          fetchAllUsers(token),
          fetchAllProducts(token),
          fetchAllReviews(token),
          fetchAllOrders(token),
        ]);

        setTotalUsers(users.length);
        setTotalProducts(products.length);
        setTotalReviews(reviews.length);
        setTotalOrders(orders.length);
      } catch (error) {
        console.error('Failed to fetch admin dashboard data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: theme.palette.text.secondary, color: theme.palette.text.primary }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: theme.palette.background.default }}>
                Total Users
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.error.main }}>
                {totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: theme.palette.text.secondary, color: theme.palette.text.primary }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: theme.palette.background.default }}>
                Total Products
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.error.main }}>
                {totalProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: theme.palette.text.secondary, color: theme.palette.text.primary }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: theme.palette.background.default }}>
                Total Reviews
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.error.main }}>
                {totalReviews}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: theme.palette.text.secondary, color: theme.palette.text.primary }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: theme.palette.background.default }}>
                Total Orders
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.error.main }}>
                {totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminHome;

