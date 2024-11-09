import axios from 'axios';
import apiConfig from '../config/apiConfig';
import cookieManager from '../utils/cookieManager';
import COOKIE_KEYS from '../constants/cookieKeys';
const authService = {
    login: async (email, password) => {
        const response = await axios.post(`${apiConfig.baseURL}/auth/login`, {
            email,
            password
        });
        const data = response.data.data; 
        cookieManager.set(COOKIE_KEYS.ID_TOKEN, data.idToken, { expires: 1 });
        cookieManager.set(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, { expires: 7 });
        return data;
    },
    register: async (formData) => {
        const updatedFormData = {
            ...formData,
            phoneNumber: "+353" + formData.phoneNumber,
        };

        const response = await axios.post(`${apiConfig.baseURL}/auth/register`, updatedFormData);
        const data = response.data.data; 
        return data;
    },
    logout: async () => {
        cookieManager.remove(COOKIE_KEYS.ID_TOKEN);
        cookieManager.remove(COOKIE_KEYS.REFRESH_TOKEN);
    }
};

export default authService;