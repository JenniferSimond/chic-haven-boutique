import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../API/apiConfig";
import styled from "styled-components";


const CardWrapper = styled.div`
    
`

const Card = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #4A4E69;
  border-radius: 5px;
  padding: 10px;
  gap: 15px;
  max-width: 800px;
`;

const ItemImage = styled.img`
  width: 90px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
`;

const Text = styled.div`
display: flex;
flex-direction: column;
`

const ButtonWrapper = styled.div`
display: flex;
flext-direction: column;
`

const ItemListCard = ({ item }) => {
  const BASE_URL = 'http://localhost:3000'; // Replace with your base URL
  const imageUrl = `${BASE_URL}${item.product_img}`;

  return (
    <CardWrapper>
        
    <Card>
      <ItemImage src={imageUrl} alt={item.product_name} />
      <Text>
      <h4>{item.product_name}</h4>
      <p>{item.product_description}</p>
      </Text>
      <ButtonWrapper>
     
                <p>{item.product_price}</p>
                <p>Quanity</p>
                <button>Remove Item</button>
           
      </ButtonWrapper>
    </Card>
    </CardWrapper>
  );
};

export {ItemListCard}