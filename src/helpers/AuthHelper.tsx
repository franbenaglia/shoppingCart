import { Preferences } from '@capacitor/preferences';
import axios from 'axios';
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

export const logout = async () => {
    await removeGoogleJwtToken();
    removeGoogleJwtTokenCookie(); 
    location.href = "/";
}

export const removeGoogleJwtTokenCookie = () => {
    //const [removeCookie] = useCookies(['googleJwtToken']);
    //removeCookie.googleJwtToken;
    document.cookie = "googleJwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export const removeGoogleJwtToken = async () => {
    return Preferences.remove({ key: 'googleJwtToken' });
};

export const isLoggedIn = async () => {

    const logged = (await getGoogleJwtToken()).value;

    return logged && logged.length > 0 ? true : false;
}

export const getGoogleJwtToken = async () => {
    return await Preferences.get({ key: 'googleJwtToken' });
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