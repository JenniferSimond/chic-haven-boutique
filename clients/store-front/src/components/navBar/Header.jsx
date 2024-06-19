import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import account from '../../assets/icons-svg/account/account.svg'
import accountLight from '../../assets/icons-svg/account/accountLight.svg'
import logo from '../../assets/icons-svg/logo/logo.svg'
import logoLight from '../../assets/icons-svg/logo/logoLight.svg'
import cart from '../../assets/icons-svg/cart/cart.svg'
import cartLight from '../../assets/icons-svg/cart/cartLight.svg'
import NavLinks from './NavLinks'
import SearchBar from './searchBar'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #9A8C98;
    height: 127px;
    width: 100vw;
    // opacity: 0.9;
`;

const IconContainer = styled.div`
    margin-right: 51px;
    display: flex;
    align-items: center;
    gap: 27px;
    
`;

const SearchContainer = styled.div`
display: flex;
flex-direction: column;

gap: 10px;
`;
const Logo = styled.img`
    margin-left: 51px;
    width: 55px;
    height: 38.36px;
    cursor: pointer;
    

    &:hover {
    opacity: 0.7;
    content: url(${props => props.$hoverIcon})
    
    }
`;

const Account = styled.img`
    width: 25px;
    height: 25.069px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    content: url(${props => props.$hoverIcon})
}
`;

const Cart = styled.img`
    width: 31.225px;
    height: 25px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    content: url(${props => props.$hoverIcon})
}
`;


const Header = () => {
    const navigate = useNavigate();

    const logoClickHandler = () => {
        navigate('/home')
    }

    const accountClickHandler = () => {
        navigate('/account')
    }

    const cartClickHandler = () => {
        navigate('/cart')
    }


    return(
        <Wrapper>
            <Logo src={logo} alt='Logo' $hoverIcon={logoLight} onClick={logoClickHandler} />
            <SearchContainer>
                <SearchBar />
                <NavLinks />
            </SearchContainer>
            <IconContainer>
                <Account  src={account} alt='Account' $hoverIcon={accountLight} onClick={accountClickHandler}/>
                <Cart src={cart} alt='Cart' $hoverIcon={cartLight} onClick={cartClickHandler}/>
            </IconContainer>
            
         
        </Wrapper>
    );
}

export default Header