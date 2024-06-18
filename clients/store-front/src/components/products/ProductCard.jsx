import React from "react";
import styled from "styled-components";
import { BASE_URL } from '../../API/apiConfig.js';
import viewEye from '../../assets/icons-svg/viewEye.svg';
import wishlist from '../../assets/icons-svg/wishlist.svg';

const CardWrapper = styled.div`
  width: 199px;
  height: 335.461px;
  margin-top: 10px;
  margin-left: 10px;
`;

const ProductName = styled.p`
  color: #d81159;
  font-family: Cinzel;
  font-size: 20px;
  white-space: nowrap;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 1.32px;
  margin-bottom: 10px;
`;

const ProductImageCard = styled.div`
  width: 199px;
  height: 254px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const PriceButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const ViewEye = styled.img`
  width: 27px;
  height: 27px;
`;

const Price = styled.p`
  color: #4a4e69;
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.215px;
`;

const Wishlist = styled.img`
  width: 22px;
  height: 22px;
`;

const ProductCard = ({ product }) => {
  const imageUrl = `${BASE_URL}${product.image_url}`;
  console.log("Product Image URL", imageUrl);

  return (
    <CardWrapper>
      <ProductName>{product.name}</ProductName>
      <ProductImageCard imageUrl={imageUrl} />
      <PriceButtonWrapper>
        <ViewEye src={viewEye} />
        <Price>${product.price}</Price>
        <Wishlist src={wishlist} />
      </PriceButtonWrapper>
    </CardWrapper>
  );
};

export { ProductCard };
