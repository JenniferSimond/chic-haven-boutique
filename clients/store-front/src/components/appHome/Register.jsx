import React, { useState } from "react";
import { customerSignup } from "../../API/user";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { setToken } from "../shared/auth";
import { fetchCart } from "../../API/cart";
import signupPic from "../../assets/img-png/signupPic.png"


const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4%;
  justify-content: center;
align-items: center;
anign-content: center;
`;

const RegistrationWrapper = styled.div`
display: flex;
  flex-direction: column;
  margin-top: 8%;
  margin-bottom: 22px;
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
  // margin-top: 8%;
  
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

    return(
      <OuterWrapper>

        <H1>Become <span>a Member</span> Today!</H1>
    
        <RegistrationWrapper>
      
            <ContentBox>
                <YellowBox />
            <ModelImage src={signupPic} />
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
            </ContentBox>

        </RegistrationWrapper>
        </OuterWrapper>
    );
}

export default Register;
