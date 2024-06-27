import React from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckOutForm from "./StripeCheckoutForm";

const stripePromise = loadStripe('pk_test_51PW06KEFbQzMVIJeWuucCm7qlmJfto3TuXbMe6kS241ugUCD23syoh7O2SDhjQ5wOCP3zHitNnHaEdG6xZ3NkH5e00Zz0mOFUt')

const CheckoutWrapper = styled.div`
margin-top: 5%;
width: 25%;
background-color: white;
border: 1px solid black;

p{
text-align: center;
margin-bottom: 5%;
}
`;



const CheckOut = ({userId, userCartId}) => {
    console.log('userID --->', userId)
console.log('UserCartId---->',userCartId)
    return (
        <CheckoutWrapper>
        <p>Enter Payment Information</p>
            <Elements stripe={stripePromise}>
                <StripeCheckOutForm userId={userId} userCartId={userCartId} />
            </Elements>
        </CheckoutWrapper>
    )
}

export default CheckOut