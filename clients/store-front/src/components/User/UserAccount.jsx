

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../API/user";
import { fetchReviewsByUser } from "../../API/reviews";
import { fetchOrdersByUserId } from "../../API/orders";
import { getToken } from "../shared/auth";
import styled from "styled-components";

const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 105px;

  h1 {
    font-family: Cinzel;
    font-size: 55px;
    color: #22223B;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
    text-align: start;
  }

  h2 {
    color: #D81159;
    font-family: Montserrat;
    font-size: 40px;
    font-style: normal;
    font-weight: 300;
    text-align: start;
    line-height: normal;
    margin-left: 6px;
  }
`;

const TileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
`;

const Tile = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 5px;
  border: 1.5px solid #22223B;
  background: rgba(217, 217, 217, 0.00);
  margin-top: 100px;
  margin-left: 5px;
  overflow-y: auto;
  padding: 20px;

  h4 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }
`;

const UserAccount = ({ userId }) => {
  const token = getToken();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState('');
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoadingState] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      setLoadingState(true);
      try {
        const fetchedUser = await getUserDetails(token);
        setUserDetails(fetchedUser);
        setError('');
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        setError('Failed to load user details');
      } finally {
        setLoadingState(false);
      }
    };
    fetchUserDetails();
  }, [token, pageRefresh, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userDetails.id) {
        try {
          const ordersData = await fetchOrdersByUserId(userDetails.id, token);
          setOrders(ordersData);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      }
    };
    fetchOrders();
  }, [userDetails.id, token]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (userDetails.id) {
        try {
          const reviewsData = await fetchReviewsByUser(userDetails.id);
          setReviews(reviewsData);
        } catch (error) {
          console.error('Failed to fetch reviews:', error);
        }
      }
    };
    fetchReviews();
  }, [userDetails.id]);

  const refreshHandler = () => {
    setPageRefresh(!pageRefresh);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <AccountWrapper>
      <h1>User Account</h1>
      <h2>We're Glad You're Home!</h2>
      <TileWrapper>
        <Tile>
          <h4>Account Details</h4>
          <p>{`User: ${userDetails.first_name} ${userDetails.last_name}`}</p>
          <p>{`Email: ${userDetails.email}`}</p>
          <p>{`Phone: ${userDetails.phone_number || ''}`}</p>
        </Tile>

        <Tile>
          <h4>Order Details</h4>
          {orders.map(order => (
            <div key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total}</p>
            </div>
          ))}
        </Tile>

        <Tile>
          <h4>Reviews</h4>
          {reviews.map(review => (
            <div key={review.id}>
              <p>Product ID: {review.product_id}</p>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </div>
          ))}
        </Tile>
      </TileWrapper>
    </AccountWrapper>
  );
};

export default UserAccount;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserDetails } from "../../API/user";
// import { fetchReviewsByUser } from "../../API/reviews";
// import { fetchOrdersByUserId } from "../../API/orders";
// import { getToken } from "../shared/auth";
// import styled from "styled-components";

// const AccountWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 30px auto;
//   padding: 0 20px;
//   max-width: 1200px;

//   h1 {
//     font-family: Cinzel;
//     font-size: 55px;
//     color: #22223B;
//     font-style: normal;
//     font-weight: 500;
//     line-height: normal;
//     text-transform: uppercase;
//     text-align: center;

//     @media (max-width: 768px) {
//       font-size: 40px;
//     }

//     @media (max-width: 480px) {
//       font-size: 30px;
//     }
//   }

//   h2 {
//     color: #D81159;
//     font-family: Montserrat;
//     font-size: 40px;
//     font-style: normal;
//     font-weight: 300;
//     text-align: center;
//     line-height: normal;
//     margin-bottom: 20px;

//     @media (max-width: 768px) {
//       font-size: 30px;
//     }

//     @media (max-width: 480px) {
//       font-size: 20px;
//     }
//   }
// `;

// const TileWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 20px;
//   flex-wrap: wrap;
//   justify-content: center;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// const Tile = styled.div`
//   width: 300px;
//   height: 300px;
//   border-radius: 5px;
//   border: 1.5px solid #22223B;
//   background: rgba(217, 217, 217, 0.00);
//   overflow-y: auto;
//   padding: 20px;
//   margin-top: 20px;

//   h4 {
//     margin-bottom: 10px;
//   }

//   p {
//     margin-bottom: 10px;
//   }

//   @media (max-width: 1024px) {
//     width: 45%;
//   }

//   @media (max-width: 768px) {
//     width: 80%;
//   }

//   @media (max-width: 480px) {
//     width: 100%;
//     padding: 10px;
//   }
// `;

// const UserAccount = ({ userId }) => {
//   const token = getToken();
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState('');
//   const [orders, setOrders] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoadingState] = useState(false);
//   const [pageRefresh, setPageRefresh] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       if (!token) {
//         navigate('/login');
//         return;
//       }
//       setLoadingState(true);
//       try {
//         const fetchedUser = await getUserDetails(token);
//         setUserDetails(fetchedUser);
//         setError('');
//       } catch (error) {
//         console.error('Failed to fetch user details:', error);
//         setError('Failed to load user details');
//       } finally {
//         setLoadingState(false);
//       }
//     };
//     fetchUserDetails();
//   }, [token, pageRefresh, navigate]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (userDetails.id) {
//         try {
//           const ordersData = await fetchOrdersByUserId(userDetails.id, token);
//           setOrders(ordersData);
//         } catch (error) {
//           console.error('Failed to fetch orders:', error);
//         }
//       }
//     };
//     fetchOrders();
//   }, [userDetails.id, token]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       if (userDetails.id) {
//         try {
//           const reviewsData = await fetchReviewsByUser(userDetails.id);
//           setReviews(reviewsData);
//         } catch (error) {
//           console.error('Failed to fetch reviews:', error);
//         }
//       }
//     };
//     fetchReviews();
//   }, [userDetails.id]);

//   const refreshHandler = () => {
//     setPageRefresh(!pageRefresh);
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <AccountWrapper>
//       <h1>User Account</h1>
//       <h2>We're Glad You're Home!</h2>
//       <TileWrapper>
//         <Tile>
//           <h4>Account Details</h4>
//           <p>{`User: ${userDetails.first_name} ${userDetails.last_name}`}</p>
//           <p>{`Email: ${userDetails.email}`}</p>
//           <p>{`Phone: ${userDetails.phone_number || ''}`}</p>
//         </Tile>

//         <Tile>
//           <h4>Order Details</h4>
//           {orders.map(order => (
//             <div key={order.id}>
//               <p>Order ID: {order.id}</p>
//               <p>Status: {order.status}</p>
//               <p>Total: ${order.total}</p>
//             </div>
//           ))}
//         </Tile>

//         <Tile>
//           <h4>Reviews</h4>
//           {reviews.map(review => (
//             <div key={review.id}>
//               <p>Product ID: {review.product_id}</p>
//               <p>Rating: {review.rating}</p>
//               <p>Comment: {review.comment}</p>
//             </div>
//           ))}
//         </Tile>
//       </TileWrapper>
//     </AccountWrapper>
//   );
// };

// export default UserAccount;


