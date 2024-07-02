import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReviewList = ({ reviews }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Review ID</TableCell>
            <TableCell>Product ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.id}</TableCell>
              <TableCell>{review.product_id}</TableCell>
              <TableCell>{review.user_id}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>{new Date(review.created_at).toLocaleString()}</TableCell>
              <TableCell>{new Date(review.updated_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewList;
