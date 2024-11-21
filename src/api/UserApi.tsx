import axios from 'axios';
import { getGoogleJwtToken } from '../helpers/AuthHelper';
import { User } from '../model/User';
//TODO PASS TO ENVIRONMENT
const URL_RESOURCE_SERVER = 'http://localhost:3000';
const baseURL = URL_RESOURCE_SERVER + "/api/v1/auth";

export const getUser = async () => {

    const token = await getGoogleJwtToken();

    try {
        axios.defaults.withXSRFToken = false;
        axios.defaults.withCredentials = true;
        const response = await axios.get(baseURL + '/profileWithJustToken', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                //'crossorigin': true,
            }
        });

        return response.data;

    } catch (error) {
        console.error('Error getting data:', error);
    }
};

export const registerUser = async (user: User) => {
    //const body = JSON.stringify(user);
    try {
        await axios.post(baseURL + '/register', { user }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Error creating data:', error);
    }
};

export const login = async (user: User) => {
    //const body = JSON.stringify(user);
    try {
        await axios.post(baseURL + '/login', { user }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Error creating data:', error);
    }
};