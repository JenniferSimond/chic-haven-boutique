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
        color: #19192D;
        text-align: center;
        font-family: Cinzel;
        font-size: 15px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.5px;
        padding-right: 24px;

        &:hover {
          opacity: 0.9;
        color: #F9F5E3;
        
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