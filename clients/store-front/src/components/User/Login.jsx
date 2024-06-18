import React, { useState } from "react";
import { customerLogin } from "../../API/user";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loginModImg from '../../assets/img-png/loginModImg.png';

const OuterWrapper = styled.div`
display: flex;
flex-direction: column;
margin-left: 105px;
margin-top: 50px;
`

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
//   align-items: center;
  gap: 35px;
  margin-top: 45px;
  margin-bottom: 25px;
`;

const InnerFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  text-transform: capitalize;

  &::placeholder {
    color: #f9f5e3;
    opacity: 0.8;
  }
`;

const Button = styled.button`
  width: 53px;
  height: 53px;
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
  width: auto;
  height: auto;
  max-height: 463.425px;
  max-width: 332.575px;
  position: absolute;
  top: 45%;
  left: 15%;
  transform: translate(-25%, -52.5%);
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
  font-size: 73px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 4.38px;

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
  font-size: 72.947px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  @media (max-width: 768px) {
    text-align: center;
   
  }
`;

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('I AM FORM!');

    try {
      const Data = await customerLogin(loginFormData);
      console.log('User Data -->', Data);
      console.log('token-->', Data.token);

      if (Data.token) {
        setToken(Data.token);
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

  console.log('Login Data (Login) ->', loginFormData);
  return (
    <OuterWrapper>

        <H1>
        Welcome <span>Back</span>
        </H1>
        
    <LoginWrapper>
    
      <div>
        <ContentBox>
          <YellowBox />
          <ModelImg src={loginModImg} />
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
        </ContentBox>
      </div>
     
    </LoginWrapper>
    <P1>Gorgeous</P1>
    </OuterWrapper>
  );
};

export default Login;
