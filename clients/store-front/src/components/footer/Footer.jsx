import styled from "styled-components";
import logo2 from '../../assets/icons-svg/logo2.svg'

const FooterDiv = styled.div`
    width: 100vw;
    height: 68px;
    background-color: #4A4E69;
`;

const FooterImage = styled.img`
    width: 85px;
    height: 27.917px;
    margin-top: 20px;
    margin-left: 51px;
`


const Footer = () => {

    return(
      <FooterDiv>
        <FooterImage src={logo2} alt="Text Logo"/>
      </FooterDiv>
    );
}

export default Footer