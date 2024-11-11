import axios from "axios";

const URL_RESOURCE_SERVER = 'http://localhost:3000';

//returns client secret
export const paymentIntent = async (amount: number, currency: string) => {

    try {
        return await axios.post(URL_RESOURCE_SERVER + "/payment/paymentintent", {
            amount: amount,
            currency: currency
        });
    } catch (error) {
        console.error('Error creating data:', error);
    }

}

export const charge = async (amount: number, tokenId: string) => {

    try {
        await axios.post(URL_RESOURCE_SERVER + "/payment/stripe_checkout", {
            stripeToken: tokenId,
            amount: amount
        });
    } catch (error) {
        console.error('Error creating data:', error);
    }

}