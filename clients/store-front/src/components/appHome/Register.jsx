import React, { useState } from "react";
import { customerSignup } from "../../API/user";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { setToken } from "../shared/auth";
import { fetchCart } from "../../API/cart";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
`;

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6%;
  margin-bottom: 22px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Register = ({ setUserId, setUserCartId }) => {
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('I AM FORM!');

    try {
      const Data = await customerSignup(registerFormData);
      console.log('User Data >>>-->', Data);
      console.log('UserID >>>---(REGISTER)--->', Data.userDetails.id);
      console.log('token-->', Data.token);

      if (Data) {
        setUserId(Data.userDetails.id);
        setToken(Data.token);

        // Fetch the user cart ID after registration
        const userCart = await fetchCart(Data.userDetails.id, Data.token);
        setUserCartId(userCart.id);

        navigate('/account');
      } else {
        console.error('Registration error');
      }
    } catch (error) {
      console.error(error);
    }

    setRegisterFormData({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone_number: ''
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  console.log('Register Data (Register) ->', registerFormData);
  return (
    <OuterWrapper>
      <H1>
        Join <span>Us</span>
      </H1>
      <RegisterWrapper>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <InnerFormWrapper>
              <InputDivs>
                <Input
                  name="first_name"
                  type="text"
                  onChange={handleChange}
                  value={registerFormData.first_name}
                  placeholder="First Name"
                />
              </InputDivs>
              <InputDivs>
                <Input
                  name="last_name"
                  type="text"
                  onChange={handleChange}
                  value={registerFormData.last_name}
                  placeholder="Last Name"
                />
              </InputDivs>
              <InputDivs>
                <Input
                  name="email"
                  type="text"
                  onChange={handleChange}
                  value={registerFormData.email}
                  placeholder="Email"
                />
              </InputDivs>
              <InputDivs>
                <Input
                  name="phone_number"
                  type="text"
                  onChange={handleChange}
                  value={registerFormData.phone_number}
                  placeholder="Phone Number"
                />
              </InputDivs>
              <InputDivs>
                <Input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={registerFormData.password}
                  placeholder="Password"
                />
              </InputDivs>
              <Button>Register</Button>
            </InnerFormWrapper>
          </form>
        </FormContainer>
      </RegisterWrapper>
      <P1>Today</P1>
    </OuterWrapper>
  );
};

export default Register;
