import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import Axios from '../api/Axios';
import * as API_ENDPOINTS from '../api/ApiEndpoints';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';

const Checkout = () => {
    return (
        <div><PaymentElement /></div>
    )

}


export default function Payments() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const options = {
        mode: 'payment',
        currency: 'usd',
        amount: 1099,
      };
    useEffect(() => {
        Axios.post(API_ENDPOINTS.PAYMENT_INTENT).then((response) => {
            setClientSecret(response.data.paymentIntent)
            console.log(response.data)
            setStripePromise(loadStripe("pk_test_51OhJSFJB0NyC4Hrh9sRe2jqUmXbMHMTctCKIMB9ivpM5OcA3Ozyn2y4EBFrGPEvuVzZcEZyNbQNgNStFWPvXx8od00lf2zs8wH"))
        })

    }, [])
    return (
        <>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <Checkout />
                </Elements>
            )}



        </>
    )
}
