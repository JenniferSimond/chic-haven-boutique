import React, {useState} from "react";
import { customerLogin } from "../../API/auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loginModImg from '../../assets/img-png/loginModImg.png'

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 35px;
    margin-top: 45px;
`

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
    background-color: #D81159;
    outline: none;
    color: #F9F5E3;
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.361px;
    text-align: center;
    text-transform: capitalize;

    &::placeholder {
        color: #F9F5E3;
        opacity: 0.8;
`;

const Button = styled.button`
    width: 53px;
    height: 53px;
    border: none;
    border-radius: 50%;
    background-color: #4A4E69;
    color: #FFBC42;

    font-family: Montserrat;
    font-size: 13.141px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.263px;
    text-transform: capitalize;
`



const ContentBox = styled.div`
display: flex;
flex-direction: row;
width: 858px;
height: 397px;
border: 3px solid #DC2E6A;
align-items: center;
`;

const YellowBox = styled.div`
    width: 429px;
    height: 397px;  
    background-color: #FFBC42;
  
`;

const ModelImg = styled.img`
width: 332.575px;
height: 463.425px;

    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(-155%, -54.6%);
`

const H1 = styled.h1`
color: #FFBC42;

font-family: Cinzel;
font-size: 73px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: 4.38px;
text-transform: uppercase;

span {
color: #4A4E69;
}
`

const P1 = styled.p`
color: #D81159;

font-family: Cinzel;
font-size: 72.947px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-transform: uppercase;
`

const Login = ({setToken}) => {
    const navigate = useNavigate()
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('I AM FORM!');

        try {
            const Data = await customerLogin(loginFormData)
            console.log('User Data -->', Data)
            console.log('token-->',Data.token)

            if (Data.token) {
                setToken(Data.token)
                navigate('/account')
            } else {
                console.error('Log in error')
            }
            
        } catch (error) {
            console.error
        }

        setLoginFormData({
            email: '',
            password: ''
        })
    }

    const handleChange = (event) => {
        // console.log("Event -->", event.target.value)

        const {name, value} = event.target
        setLoginFormData(prevState => ({
            ...prevState, 
            [name]: value
        }));
    }

    console.log('Login Data ->', loginFormData)
    return(
    //value={} -->  value for state
        // another wrapper
        // top text

        <LoginWrapper>

        <H1>Welcome <span>Back</span></H1>
    <div>
            <ModelImg src={loginModImg}/>
        <ContentBox>

        <YellowBox />
        <form onSubmit={handleSubmit}>
            <InnerFormWrapper>

                
            <InputDivs>
            
            <Input name="email" type="text" onChange={handleChange} value={loginFormData.email} placeholder="Email"/>
            </InputDivs>
            <InputDivs>
            
            <Input name="password" type="password" onChange={handleChange} value={loginFormData.password} placeholder="Password" />
            </InputDivs>
            
            <Button>Login</Button>
            </InnerFormWrapper>
        </form>
        </ContentBox>
        
    </div>
    <P1>Gorgeous</P1>
        </LoginWrapper>
    
    )
}
export default Login