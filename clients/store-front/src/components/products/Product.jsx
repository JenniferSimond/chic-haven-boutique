import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../API/product";
import { BASE_URL } from "../../API/apiConfig";
import styled from "styled-components";
import cartLight from '../../assets/icons-svg/cart/cartLight.svg'
import wishlistLight from '../../assets/icons-svg/wishlist/wishlistLight.svg'

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  margin-left: 105px;
  align-items: center;
  gap: 20px;
`;

const NameImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductName = styled.h1`
  color: #4A4E69;
  font-family: Cinzel;
  font-size: 55px;
  white-space: nowrap;
  text-align: start;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 1.32px;
  margin-bottom: 10px;
`;

const ProductImageCard = styled.div`
  width: 540px;
  height: 540px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const DescriptionPrice = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 120px;
`;

const Description = styled.p`
  color: #4A4E69;
  font-family: Montserrat;
  font-size: 25px;
  text-align: start;
  font-style: normal;
  font-weight: 300;
  line-height: 40px;
  letter-spacing: 2px;
  padding-right: 0px;
  opacity: 1;
`;

const Price = styled.p`
  color: #22223B;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.215px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
`;

const Button = styled.button`
    width: 80px;
  background-color:#9A8C98;
  color: #fff;
  font-family: Montserrat;
  font-size: 15px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: #4A4E69;
  }
`;

const CartIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const WishlistIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const { productId } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const fetchedProduct = await fetchProduct(productId);
        console.log('Fetched Product (product) -->', fetchedProduct);
        setSelectedProduct(fetchedProduct);
      } catch (error) {
        // reset selected product if error
        setSelectedProduct('');
        console.error('Failed to fetch product', error);
      }
    };

    if (productId) {
      getProductById();
    }
  }, [productId]);

  if (!selectedProduct) {
    return <div>Product Not Found! 🤦🏽‍♀️</div>;
  }

  const imageUrl = `${BASE_URL}${selectedProduct.image_url}`;

  return (
    <ProductWrapper>
      <NameImageWrapper>
        <ProductName>{selectedProduct.name}</ProductName>
        <ProductImageCard $imageUrl={imageUrl} />
      </NameImageWrapper>
      <DescriptionPrice>
        <Description>{selectedProduct.description}</Description>
        <Price>{`$${selectedProduct.price}`}</Price>
        <ButtonWrapper>
          <Button>
            <CartIcon src={cartLight} />
            Cart 
          </Button>
          <Button>
            <WishlistIcon src={wishlistLight} />
              Wishlist
          </Button>
        </ButtonWrapper>
      </DescriptionPrice>
    </ProductWrapper>
  );
};

export default Product;
