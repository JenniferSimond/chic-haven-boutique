import styled from "styled-components";
import logo2 from '../../assets/icons-svg/logo/logo2.svg'

const FooterDiv = styled.div`
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
    min-height: 80px;
    background-color: #22223B;
`;

const FooterImage = styled.img`
    width: 85px;
    height: 27.917px;
    padding-top: 20px;
    padding-left: 51px;
`


const Footer = () => {

    return(
      <FooterDiv>
        <FooterImage src={logo2} alt="Text Logo"/>
      </FooterDiv>
    );
}

export default Footer