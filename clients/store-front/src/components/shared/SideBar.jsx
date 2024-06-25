import React from 'react';
import styled from 'styled-components';
import sideBarImg from '../../assets/img-png/sideBarImg.png'

import instagram from '../../assets/icons-svg/social-media/instagram.svg'
import facebook from '../../assets/icons-svg/social-media/facebook.svg'
import tiktok from '../../assets/icons-svg/social-media/tiktok.svg'

const SidebarWrapper = styled.div`
  width: 20%;
  min-height: 80vh;
  background-color: #ffbc42;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const PromoBox = styled.div`
  min-height: 10%;
  background-color: #fff;
  color: #000;
  padding: 15px;
  margin-bottom: 0px;
  text-align: center;
  border-radius: 5px;
`;

const PromoImage = styled.img`
  width: 70%;
  height: auto;
  border-radius: 3px;
  margin-top: 10px;
`;

const JoinMovement = styled.div`
  color: #d81159;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Cinzel', serif;
  font-size: 18px;
  font-weight: bold;
`;

const SocialImg = styled.img`
height: 25px;
width: 25px;
`;

const SocialLinks = styled.div`
justify-content: center;

width: 100%;
display: flex;
flex-direction;
 gap: 10%;
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <PromoBox>
        <p>Save on Summer Dresses!</p>
       
       <p>Code: SUMMERBREEZE</p>
        
      </PromoBox>
    
      <JoinMovement>
        <p>JOIN THE MOVEMENT</p>
        
      </JoinMovement>
      <PromoImage src={sideBarImg} alt="Join Movement" />
      <SocialLinks>
      <SocialImg src={instagram}/>
      <SocialImg src={facebook}/>
      <SocialImg src={tiktok}/>
      </SocialLinks>
     
     
    
    </SidebarWrapper>
  );
};

export default Sidebar;
