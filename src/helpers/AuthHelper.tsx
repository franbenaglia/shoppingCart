import { Preferences } from '@capacitor/preferences';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { User } from '../model/User';
//TODO PASS TO ENVIRONMENT
const URL_RESOURCE_SERVER = 'http://localhost:3000';
const baseURL = URL_RESOURCE_SERVER + "/api/v1/auth";

export const registerUser = async (user: User) => {
    //const body = JSON.stringify(user);
    try {
        await axios.post(baseURL + '/register', { user }, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Headers':'*',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Origin': '*'
            }});
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
              'Access-Control-Allow-Headers':'*',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Origin': '*'
            }});
    } catch (error) {
        console.error('Error creating data:', error);
    }
};

export const logout = () => {
    removeGoogleJwtToken();
    removeGoogleJwtTokenCookie();
}

export const removeGoogleJwtTokenCookie = () => {
    const [removeCookie] = useCookies(['googleJwtToken']);
    removeCookie.googleJwtToken;
}

export const removeGoogleJwtToken = async () => {
    return Preferences.remove({ key: 'googleJwtToken' });
};

export const isLoggedIn = async () => {
    return (await getGoogleJwtToken()).value ? true : false;
}

export const getGoogleJwtToken = async () => {
    return Preferences.get({ key: 'googleJwtToken' });
};

export const setGoogleJwtToken = async (flag: string) => {
    await Preferences.set({
        key: 'googleJwtToken',
        value: flag,
    });
};

export const googleOauth2Login = () => {
    window.open(URL_RESOURCE_SERVER + "/googleoauth2/google", "_self");
}

export const githubOauth2Login = () => {
    window.open(URL_RESOURCE_SERVER + "/googleoauth2/github", "_self");
}