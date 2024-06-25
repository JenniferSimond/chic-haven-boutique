import React from "react";
import styled from "styled-components";
import { deleteCartItem } from "../../API/cart";
import { getToken } from "../shared/auth";

const CardWrapper = styled.div`
    min-width: 80%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #4A4E69;
  border-radius: 5px;
  height: 200px;
  margin: 3%;
`;

const ItemImage = styled.img`
  min-width: 90px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
  margin: 1%;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: white;
  margin: 1%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-width: 20%;
  margin: 1%;
`;

const ItemListCard = ({ item, refresh }) => {
  const token = getToken();
  const BASE_URL = 'http://localhost:3000'; 
  const imageUrl = `${BASE_URL}${item.product_img}`;

  const buttonClickHandler = async () => {
    try {
      const response = await deleteCartItem(item.id, token);
     
        refresh();
        console.log('Item deleted successfully');
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  return (
    <CardWrapper>
      <Card>
        <ItemImage src={imageUrl} alt={item.product_name} />
        <Text>
          <h4>{item.product_name}</h4>
          <p>{item.product_description}</p>
        </Text>
        <ButtonWrapper>
          <div>
            <p>{`$${item.product_price}`}</p>
          </div>
          <p>Quantity</p>
          <div>
            <button onClick={buttonClickHandler}>Remove Item</button>
          </div>
        </ButtonWrapper>
      </Card>
    </CardWrapper>
  );
};

export { ItemListCard };
