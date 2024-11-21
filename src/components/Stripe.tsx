import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { paymentIntent } from '../api/StripeApi';
import { CartContext } from '../contexts/ShoppingCartContext';
import { IonButton } from '@ionic/react';
const URL_CLIENT = 'http://localhost:8100/SuccessPayment';

const CheckoutForm = () => {

    const stripe: Stripe | null = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null);

    const { totalPrice } = useContext(CartContext);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            // Show error to your customer
            setErrorMessage(submitError.message as any);
            return;
        }

        const amount = totalPrice();

        const clientSecret = await paymentIntent(amount, 'usd');

        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret: clientSecret.data,
            confirmParams: {
                return_url: URL_CLIENT,
            },
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message as any);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <IonButton type="submit" disabled={!stripe || !elements}>
                PAY
            </IonButton>
            {/* Show error message to your customers */}
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

const stripePromise = loadStripe('pk_test_51PuNtUFLZ0CBWG9HXEqXEGIel2qw3i8a0zxacrXtu1ELzshyyYWZn3xoS7p1PoZnq1m0nfVyvYLObyRT7UUJO3Ru00xxzWGUdo');

const options: StripeElementsOptions = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
        /*...*/
    },
};

export const StripeComponent = () => (
    <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
    </Elements>
);