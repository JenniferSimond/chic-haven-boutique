import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import homeHero from '../../assets/img-png/homeHero.png';
import product1 from '../../assets/img-png/product1.png';
import product2 from '../../assets/img-png/product2.png';
import product3 from '../../assets/img-png/product3.png';
import newCollection from '../../assets/img-png/newCollection.png';

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 15px;
`;

const InnerHeroWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 78px;
`;

const HeroImage = styled.img`
  max-height: 365px;
  max-width: 365px;
  border-radius: 3px;
`;

const HeroTextContainer = styled.div`
  margin-top: 36px;
`;

const InnerHeroText = styled.div`
  width: 700px;
  padding-top: 20px;
`;

const P1 = styled.p`
  color: #22223B;
  text-align: start;
  font-family: Cinzel;
  font-size: 57px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.34px;

  span {
    color: #FFBC42;
  }
`;

const P2 = styled.p`
  color: #D81159;
  font-family: Montserrat;
  font-size: 46px;
  font-style: normal;
  font-weight: 400;
  text-align: start;
  line-height: normal;
  text-transform: uppercase;
`;

const P3 = styled.p`
  color: #4A4E69;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 33px;
  letter-spacing: 0.4px;
  padding-right: 200px;

  span {
    color: #D81159;
  }
`;

const HeroButton = styled.button`
  width: 100px;
  height: 29px;
  background: #FFBC42;
  border-radius: 3px;
  border: none;
  margin-top: 26px;

  p {
    color: #22223B;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.32px;
  }
`;

const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 53px;
  margin-top: 40px;
`;

const Product = styled.div`
  text-align: center;
`;

const ProductImage = styled.img`
  max-width: 199px;
  max-height: 254px;
  border-radius: 3px;
`;

const ProductText = styled.p`
  color: ${props => props.highlight ? '#D81159' : '#4A4E69'};
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signup');
  };

  const homePageProducts = [
    { id: 1, image: product1, text: 'Hot Pick!', highlight: true },
    { id: 2, image: product2, text: 'Back In Stock!', highlight: false },
    { id: 3, image: product3, text: 'Top Seller', highlight: true },
    { id: 4, image: newCollection, text: 'New Collection!', highlight: false }
  ];

  return (
    <HeroWrapper>
      <InnerHeroWrapper>
        <HeroImage src={homeHero} alt="Clothing models" />
        <HeroTextContainer>
          <P1>
            EVERY <span>CHIC</span> GIRL
          </P1>
          <P2>NEEDS A HAVEN</P2>
          <InnerHeroText>
            <P3>
              Become a member, earn points with every purchase, and enjoy <span>15%</span> off your first order!
            </P3>
          </InnerHeroText>
          <HeroButton onClick={handleClick}>Sign Up!</HeroButton>
        </HeroTextContainer>
      </InnerHeroWrapper>

      <ProductsWrapper>
        {homePageProducts.map((product) => (
          <Product key={product.id}>
            <ProductImage src={product.image} alt={product.text} />
            <ProductText highlight={product.highlight}>{product.text}</ProductText>
          </Product>
        ))}
      </ProductsWrapper>
    </HeroWrapper>
  );
};

export default HomePage;
