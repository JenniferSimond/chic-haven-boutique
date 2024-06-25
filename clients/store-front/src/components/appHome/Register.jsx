import React, { useState } from "react";
import { customerSignup } from "../../API/user";
import styled from "styled-components";
import { setToken, getToken } from "../shared/auth";
import signupPic from '../../assets/img-png/signupPic.png'


const RegistrationWrapper = styled.div`
display: flex;
flex-direction: column;
margin-top: 2%;
width: 100%;
justify-content: center;
align-items: center;
anign-content: center;

`

const InnerWrapper = styled.div`
 margin-top: 5%;
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
 align-content: center;

 background-color: blue;
`;


const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 858px;
  height: 397px;
  border: 3px solid #dc2e6a;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const YellowBox = styled.div`
  width: 50%;
  height: 100%;
  background-color: #ffbc42;
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const ModelImage = styled.img`
display: block;
  width: auto;
  height: auto;
  // max-height: 463.425px;
  max-width: 45%;
  position: absolute;
  top: 45%;
  left: 15%;
  transform: translate(-25%, -56%);
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: auto;
  }
`;

const FormContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center; /* Center items vertically */
  align-content: center;
  
`;


const InnerFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const InputDivs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 15px 0px;
  border-radius: 3px;
`;

const Input = styled.input`
 max-width: 313.965px;
  min-width: 250px;
  height: 27px;
  border: none;
  border-radius: 3px;
  background-color: #d81159;
  outline: none;
  color: #f9f5e3;
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.361px;
  text-align: center;
  &::placeholder {
    color: #f9f5e3;
    opacity: 0.8;
`;

const Button = styled.button`
  width: 65px;
  height: 65px;
  border: none;
  border-radius: 50%;
  background-color: #4a4e69;
  color: #ffbc42;
  font-family: Montserrat;
  font-size: 13.141px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.263px;
  text-transform: capitalize;

  &:hover {
  background-color: #FFBC42;
  color: #D81159;
  font-size: 15px;
  }
`;


const H1 = styled.h1`
  color: #ffbc42;
  font-family: Cinzel;
  font-size: 75px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 4.38px;
  text-align: start;
  text-transform: uppercase;
  span {
    color: #4a4e69;
  }
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Register = () => {

    return(
        <RegistrationWrapper>
          <H1>Become <span>a Member</span> Today!</H1>
         
            <ContentBox>
                <YellowBox />
            <ModelImage src={signupPic} />
            <FormContainer>
                <form>
                    <InnerFormWrapper>
                <InputDivs>
                <Input name='lastName' type='text' placeholder='Last Name'/>
                </InputDivs>    

                <InputDivs> 
                <Input name='firstName' type='text' placeholder='First Name'/>
                </InputDivs>
                <InputDivs>
                <Input name='password' type='password' placeholder='Password'/>
                </InputDivs>
                <InputDivs> 
                <Input name='email' type='text' placeholder='Email Address'/>
                </InputDivs>
                <InputDivs>
                
                <Input name='phone_numer' type='text' placeholder='Phone Number'/>
                </InputDivs>
                <Button>Signup</Button>
                    </InnerFormWrapper>
                </form>
            </FormContainer>
            </ContentBox>
         
        </RegistrationWrapper>
    );
}

export default Register