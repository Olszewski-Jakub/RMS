import cookieManager from '../utils/cookieManager';
import COOKIE_KEYS from '../constants/cookieKeys';
import axios from 'axios';

const authService = {
    login: async (email, password) => {
        const response = await axios.post("https://api-d4o6tbc5fq-uc.a.run.app" + `/auth/login`, {
            email,
            password
        });
        const data = response.data.data; 
        cookieManager.set(COOKIE_KEYS.ID_TOKEN, data.idToken, { expires: 1 });
        cookieManager.set(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, { expires: 7 });

        console.log("Access token:", data.idToken);
        return data;
    },
    register: async (formData) => {
        const code = formData.countryCode;
        const updatedFormData = {
            ...formData,
            phoneNumber: code + formData.phoneNumber,
        };

        const response = await axios.post("https://api-d4o6tbc5fq-uc.a.run.app" + `/auth/register`, updatedFormData);
        const data = response.data.data; 
        return data;
    },
    logout: async () => {
        cookieManager.remove(COOKIE_KEYS.ID_TOKEN);
        cookieManager.remove(COOKIE_KEYS.REFRESH_TOKEN);
    },
    refreshToken: async () => {
        const refreshToken = cookieManager.get(COOKIE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.post("https://api-d4o6tbc5fq-uc.a.run.app" + `/auth/refreshToken`, {
            refreshToken: refreshToken
        });

        const data = response.data.data;
        cookieManager.set(COOKIE_KEYS.ID_TOKEN, data.idToken, { expires: 1 });
        cookieManager.set(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, { expires: 7 });

        return data.idToken;
    }

};

export default authService;