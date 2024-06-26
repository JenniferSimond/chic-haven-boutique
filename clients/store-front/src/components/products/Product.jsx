import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../../API/product";
import { addCartItem } from "../../API/cart";
import { ProductReview } from "./ProductReview";
import { BASE_URL } from "../../API/apiConfig";
import styled from "styled-components";
import cartLight from '../../assets/icons-svg/cart/cartLight.svg'
import wishlistLight from '../../assets/icons-svg/wishlist/wishlistLight.svg'
import { getToken } from "../shared/auth";

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  margin-left: 0;
  align-items: center;
  justify-content: center;
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
  border-radius: 3px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const InnerWrapper = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 120px;
  margin-top: 8%;
`;

const Description = styled.p`
  color: #4A4E69;
  font-family: Montserrat;
  font-size: 20px;
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
  border-radius: 3px;
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

const Product = ({userCartId, userId}) => {
  const token = getToken()
  const [selectedProduct, setSelectedProduct] = useState('');
  const { productId } = useParams();
  const navigate = useNavigate();

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

  const handleAddCartClick = async () => {
    if (!token){
      navigate('/login')
      return
    }
    try {
      const addItem = await addCartItem(token, userCartId, selectedProduct.id, 1);
      console.log('New cart item (product) -->',addItem);
      navigate('/products');
    } catch (error) {
      console.error('Error adding item',error)
    }

  }


  return (
    <ProductWrapper>
      <NameImageWrapper>
        <ProductName>{selectedProduct.name}</ProductName>
        <ProductImageCard $imageUrl={imageUrl} />
      </NameImageWrapper>
      <InnerWrapper>
        <Description>{selectedProduct.description}</Description>
        <Price>{`$${selectedProduct.price}`}</Price>
        <ButtonWrapper>
          <Button onClick={handleAddCartClick}>
            <CartIcon src={cartLight}/>Cart</Button>
          <Button>
            <WishlistIcon src={wishlistLight} />Wishlist</Button>
        </ButtonWrapper>
        <ProductReview selectedProduct={selectedProduct} userId={userId} />
      </InnerWrapper>
    
    </ProductWrapper>
  );
};

export default Product;
