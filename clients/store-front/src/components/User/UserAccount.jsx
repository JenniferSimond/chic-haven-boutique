import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../API/user";
import { fetchCart } from "../../API/cart";

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
    line-height: mormal;
    margin-left: 6px;
  
    }

    span {
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

p {

}

span {

}
`;

const CartTile = styled.div`

`;

const WishlistTile = styled.div`

`;



const UserAccount = ({token, setUserId, setUserCartId}) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState('')
  const [carId, setCarId] = useState('')
  const [loading, setLoadingState] = useState(false); // used to change view is user not signed it
  const [pageRefresh, setPageRefresh] = useState(false); // page refresh will be used if user updates account information --> Maybe, may change layout
  const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchUserDetails = async () => {

            if (!token) {
                navigate('/login');
                return; //return if no Token
            }
            setLoadingState(true); // >-- IMPORTANT --> Update to loading wheel (LATER)
            try {
                const fetchedUser = await getUserDetails(token);
                console.log('Fetched Details (users) -->', (fetchedUser))
                setUserDetails(fetchedUser);
                setUserId(fetchedUser.id)
                setError('')
            } catch (error) {
                console.error('Failed to fetch user details:', error);
                setError('Failed to load user details');
            } finally {
                setLoadingState(false);
            }
        }
       fetchUserDetails()
    }, [token, pageRefresh])

    const refreshHandler = () => {
      setPageRefresh(!pageRefresh)  //toggle opposite value
  }

    useEffect(() => {

          const getUserCart = async () => {

            if (!userDetails) {
              return
            }
            try {
              const userCart = await fetchCart(userDetails.id, token);
              console.log('User Cart (users) --> ', userCart);
              setUserCartId(userCart.id);
              setCarId(userCart.id)
            } catch (error) {
              console.error('Error fetching cart');
            }
          };
    
          getUserCart();
        }
      , [token, carId]);

    
  
  

     if (loading) {
        return <p>Loading...</p>
     }

     if (error) {
        return <p>{error}</p>
     }

     

    return(
        <AccountWrapper>

            <h1>User Account</h1>
            <h2>We're Glad You're Home!</h2>
            <TileWrapper>
             
             <Tile>
               <h4>Account Details</h4>
               <p>{`User: ${userDetails.first_name} ${userDetails.last_name}`}</p>
               <p>{`Email: ${userDetails.email}`}</p>
               <p>{`Phone: ${userDetails.phone_number}` || ''}</p>
             </Tile>

            <Tile>
            <h4>Order Details</h4>
            </Tile>
            <Tile>
            <h4>Reviews</h4>
            </Tile>

        
            </TileWrapper>


        </AccountWrapper>
    );
}

export default UserAccount