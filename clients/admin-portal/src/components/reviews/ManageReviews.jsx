import React, { useState, useEffect } from 'react';
import { getAdminToken } from '../../shared/adminAuth';
import ReviewList from './ReviewList';
import { fetchAllReviews } from '../../API/reviews';
import { Box, Container, Typography, Pagination } from '@mui/material';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [reviewsPerPage] = useState(10);

  useEffect(() => {
    const token = getAdminToken();
    const getReviews = async () => {
      try {
        const fetchedReviews = await fetchAllReviews(token);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      }
    };

    getReviews();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastReview = page * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="h3">Product Reviews</Typography>
      </Box>
      <Box sx={{ mt: 2, height: '70vh', overflowY: 'scroll' }}>
        <ReviewList reviews={currentReviews} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(reviews.length / reviewsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default ManageReviews;
