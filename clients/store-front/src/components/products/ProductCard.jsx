import React from "react";
import styled from "styled-components";
import { BASE_URL } from '../../API/apiConfig.js';
import viewEye from '../../assets/icons-svg/eye/viewEye.svg'
import viewPink from '../../assets/icons-svg/eye/viewPink.svg'
import wishlist from '../../assets/icons-svg/wishlist/wishlist.svg'
import wishlistPink  from '../../assets/icons-svg/wishlist/wishlistPink.svg'
import { useNavigate } from "react-router-dom";

const CardWrapper = styled.div`
  width: 255px;
  height: 335.461px;
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductName = styled.p`
  color: #4A4E69;
  font-family: Cinzel;
  font-size: 20px;
  white-space: nowrap;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 1.32px;
  margin-bottom: 10px;
`;

const ProductImageCard = styled.div`
  width: 199px;
  height: 254px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 3px;
 margin-bottom: 5%;
`;

const PriceButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  opacity: 1;
`;

const SvgIcon = styled.img`
    width: ${props => props.width || '25px'};
    height: ${props => props.width || '25px'};
    cursor: pointer;

    &:hover {
    content: url(${props => props.$hoverIcon2})

    }

    opacity: 0.9;
`

const Price = styled.p`
  color: #4a4e69;
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.215px;
`;



const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const imageUrl = `${BASE_URL}${product.image_url}`;
  // console.log("Product Image URL", imageUrl);

  const handleViewClick = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <CardWrapper>
      <ProductName>{product.name}</ProductName>
      <ProductImageCard $imageUrl={imageUrl} />
      <PriceButtonWrapper>
        <SvgIcon 
        src={viewEye} 
        $hoverIcon2={viewPink}
        onClick={handleViewClick}
        />
        <Price>${product.price}</Price>
        <SvgIcon 
        width={'21px'}
        height={'21px'}
        src={wishlist} 
        $hoverIcon2={wishlistPink}
       
        />
      </PriceButtonWrapper>
    </CardWrapper>
  );
};

export { ProductCard };
