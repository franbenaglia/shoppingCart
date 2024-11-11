import axios from 'axios';
import { getGoogleJwtToken } from '../helpers/AuthHelper';
//TODO PASS TO ENVIRONMENT
const URL_RESOURCE_SERVER = 'http://localhost:3000';
const baseURL = URL_RESOURCE_SERVER + "/api/v1/auth";

export const getUser = async () => {

    const token = await getGoogleJwtToken();

    try {
        axios.defaults.withXSRFToken = false;
        axios.defaults.withCredentials = true;
        const response =  await axios.get(baseURL + '/profileWithJustToken', {
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