import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customerLogin } from "../../API/user";
import styled from "styled-components";
import loginModImg from '../../assets/img-png/loginModImg.png';
import { setToken } from "../shared/auth";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6%;
  margin-bottom: 22px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items vertically */
  align-content: center;
  width: 50%;
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
  }
`;

const Button = styled.button`
  width: 60px;
  height: 60px;
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

const ModelImg = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-width: 40%;
  position: absolute;
  top: 45%;
  left: 15%;
  transform: translate(-25%, -54.1%);
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: auto;
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

const P1 = styled.p`
  color: #d81159;
  font-family: Cinzel;
  font-size: 75px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  padding-left: 4px;
  text-transform: uppercase;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const H3 = styled.h3`
  font-family: Montserrat;
  font-size: 16.323px;
  font-style: normal;
  font-weight: 400;
  line-height: 26.932px; /* 165% */
  letter-spacing: 0.326px;
  position: relative;
`;

const Login = ({ setUserId }) => {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await customerLogin(loginFormData);
      console.log('User Data >>>-->', data);

      if (data) {
        setUserId(data.userDetails.id);
        setToken(data.token);
        navigate('/account');
      } else {
        console.error('Log in error');
      }
    } catch (error) {
      console.error(error);
    }

    setLoginFormData({
      email: '',
      password: ''
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <OuterWrapper>
      <H1>
        Welcome <span>Back</span>
      </H1>
      <LoginWrapper>
        <ContentBox>
          <YellowBox />
          <ModelImg src={loginModImg} />
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <InnerFormWrapper>
                <InputDivs>
                  <Input
                    name="email"
                    type="text"
                    onChange={handleChange}
                    value={loginFormData.email}
                    placeholder="Email"
                  />
                </InputDivs>
                <InputDivs>
                  <Input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={loginFormData.password}
                    placeholder="Password"
                  />
                </InputDivs>
                <Button>Login</Button>
              </InnerFormWrapper>
            </form>
            <H3>Not a Member Yet, Sign Up Today!</H3>
          </FormContainer>
        </ContentBox>
      </LoginWrapper>
      <P1>Gorgeous</P1>
    </OuterWrapper>
  );
};

export default Login;

