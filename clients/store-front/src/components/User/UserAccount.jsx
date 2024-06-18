import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../API/user";
import styled from "styled-components";


const AccountWrapper = styled.div`
    display: flex;
    flex-direction: column;
   
`;

const TileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserTile = styled.div`

`;

const CartTile = styled.div`

`;

const WishlistTile = styled.div`

`;



const UserAccount = ({token}) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState('')
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

    if (!token) {
        navigate('/login');
        return null //return null --> won't render on screen --> * Only way it worked here
     }

     if (loading) {
        return <p>Loading...</p>
     }

     if (error) {
        return <p>{error}</p>
     }

    return(
        <AccountWrapper>
            <TileWrapper>
             
             <UserTile>
               
             </UserTile>

            <CartTile></CartTile>

            <WishlistTile></WishlistTile>

        
            </TileWrapper>


        </AccountWrapper>
    );
}

export default UserAccount