import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import account from '../../assets/icons-svg/account/account.svg'
import accountLight from '../../assets/icons-svg/account/accountLight.svg'
import logo2Light from '../../assets/icons-svg/logo/logo2Light.svg'
import logo from '../../assets/icons-svg/logo/logo.svg'
import logoLight from '../../assets/icons-svg/logo/logoLight.svg'
import cart from '../../assets/icons-svg/cart/cart.svg'
import cartLight from '../../assets/icons-svg/cart/cartLight.svg'
import NavLinks from './NavLinks'
import SearchBar from './searchBar'

const Wrapper = styled.header`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #9A8C98;
    min-height: 100px;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 100; 

`;

const IconContainer = styled.div`
    margin-right: 50px;
    display: flex;
    align-items: center;
    gap: 27px;
    
`;

const SearchContainer = styled.div`
display: flex;
flex-direction: column;
margin-inline-trim: 30%;
margin-top: 20px;
gap: 11px;
`;
const Logo = styled.img`
    margin-left: 50px;
    width: 154px;
    height: 49.63px;
    cursor: pointer;
    

    &:hover {
    opacity: 0.7;
    content: url(${props => props.$hoverIcon})
    
    }
`;

const NavLinksContainer = styled.div`
 align-self: center;
`
const Account = styled.img`
    width: 35px;
    height: 35.069px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    content: url(${props => props.$hoverIcon})
}
`;

const Cart = styled.img`
    width: 43.225px;
    height: 38px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    content: url(${props => props.$hoverIcon})
}
`;


const Header = (token) => {
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
            <Logo src={logo2Light} alt='Logo'  onClick={logoClickHandler} />
            <SearchContainer>
                <SearchBar />
                <NavLinksContainer>
                <NavLinks />
                </NavLinksContainer>
               
            </SearchContainer>
            <IconContainer>
                <Account  src={account} alt='Account' $hoverIcon={accountLight} onClick={accountClickHandler}/>
                <Cart src={cart} alt='Cart' $hoverIcon={cartLight} onClick={cartClickHandler}/>

             
            </IconContainer>
            
         
        </Wrapper>
    );
}

export default Header