import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getToken } from "../shared/auth";
import diamondFilled from '../../assets/icons-svg/reviewDiamond/diamondFilled.svg';
import diamondGrey from '../../assets/icons-svg/reviewDiamond/diamondGrey.svg';
import { fetchReviewsByProduct, createReview } from "../../API/reviews";

const ReviewWrapper = styled.div`
  margin-top: 20px;
`;

const ReviewTitle = styled.h3`
  font-family: Cinzel;
  font-size: 24px;
  color: #4A4E69;
  margin-bottom: 10px;
`;

const ReviewList = styled.div`
  margin-top: 10px;
`;

const ReviewItem = styled.div`
  margin-bottom: 10px;
`;

const RatingWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const DiamondIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const LeaveReviewWrapper = styled.div`
  margin-top: 20px;
`;

const ReviewInput = styled.textarea`
  width: 100%;
  height: 60px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  background-color: #4A4E69;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #9A8C98;
  }
`;

const ProductReview = ({ selectedProduct, userId }) => {
  const token = getToken();
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const getProductReviews = async () => {
      try {
        const productReviews = await fetchReviewsByProduct(selectedProduct.id);
        console.log("Product Reviews (API) -->", productReviews);

        if (productReviews && Array.isArray(productReviews)) {
          setReviews(productReviews);
          const avgRating = productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length;
          setAverageRating(avgRating);
        } else {
          setReviews([]);
          setAverageRating(0);
        }
      } catch (error) {
        console.error("Error fetching product reviews:", error);
        setReviews([]);
        setAverageRating(0);
      }
    };

    getProductReviews();
  }, [selectedProduct.id]);

  const handleRatingClick = (value) => {
    setNewRating(value);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleReviewSubmit = async () => {
    if (newRating === 0 || newComment.trim() === "") {
      return;
    }

    try {
      const newReview = await createReview(token, userId, selectedProduct.id, newRating, newComment);
      setReviews([...reviews, newReview]);
      const newAvgRating = [...reviews, newReview].reduce((acc, review) => acc + review.rating, 0) / (reviews.length + 1);
      setAverageRating(newAvgRating);
      setNewRating(0);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <ReviewWrapper>
      <ReviewTitle>Customer Reviews</ReviewTitle>
      <div>
        Average Rating: {averageRating.toFixed(1)}{" "}
        {[1, 2, 3, 4, 5].map((value) => (
          <DiamondIcon
            key={value}
            src={value <= averageRating ? diamondFilled : diamondGrey}
            alt={`${value} star`}
          />
        ))}
      </div>
      <ReviewList>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <ReviewItem key={review.id}>
              <RatingWrapper>
                {[1, 2, 3, 4, 5].map((value) => (
                  <DiamondIcon
                    key={value}
                    src={value <= review.rating ? diamondFilled : diamondGrey}
                    alt={`${value} star`}
                  />
                ))}
              </RatingWrapper>
              <p>{review.comment}</p>
            </ReviewItem>
          ))
        )}
      </ReviewList>
      <LeaveReviewWrapper>
        <ReviewTitle>Leave a Review</ReviewTitle>
        <RatingWrapper>
          {[1, 2, 3, 4, 5].map((value) => (
            <DiamondIcon
              key={value}
              src={value <= newRating ? diamondFilled : diamondGrey}
              alt={`${value} star`}
              onClick={() => handleRatingClick(value)}
            />
          ))}
        </RatingWrapper>
        <ReviewInput
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write your review here..."
        />
        <SubmitButton onClick={handleReviewSubmit}>Submit</SubmitButton>
      </LeaveReviewWrapper>
    </ReviewWrapper>
  );
};

export { ProductReview };
