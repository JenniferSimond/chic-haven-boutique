import {Link} from 'react-router-dom'
import styled from 'styled-components'

const UL = styled.ul`
    list-style-type: none;
`;

const LI = styled.li`
    display: inline;
    // padding: 34px;
    a {
        text-decoration: none;
        color: #22223B;
        text-align: center;
        font-family: Cinzel;
        font-size: 15px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.34px;
        padding-right: 24px;

        &:hover {
        color: #FFBC42;
        
        }
    }
`;

const NavLinks = () => {
    return(
      <nav>
        <UL>

            <LI>
              <Link to='/products'>SHOP</Link>
            </LI>

            <LI>
              <Link to='/wishlist'>WISHLIST</Link>
            </LI>

            <LI>
              <Link to='/about'>ABOUT</Link>
            </LI>
            
        </UL>


      </nav>
    );
}

export default NavLinks