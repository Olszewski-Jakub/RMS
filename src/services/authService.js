import axiosInstance from '../config/apiConfig';
import cookieManager from '../utils/cookieManager';
import COOKIE_KEYS from '../constants/cookieKeys';

const authService = {
    login: async (email, password) => {
        const response = await axiosInstance.post(`/auth/login`, {
            email,
            password
        });
        const data = response.data.data; 
        cookieManager.set(COOKIE_KEYS.ID_TOKEN, data.idToken, { expires: 1 });
        cookieManager.set(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, { expires: 7 });
        return data;
    },
    register: async (formData) => {
        const code = formData.countryCode;
        const updatedFormData = {
            ...formData,
            phoneNumber: code + formData.phoneNumber,
        };

        const response = await axiosInstance.post(`/auth/register`, updatedFormData);
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

        const response = await axiosInstance.post(`/auth/refreshToken`, {
            refreshToken: refreshToken
        });

        const data = response.data.data;
        cookieManager.set(COOKIE_KEYS.ID_TOKEN, data.idToken, { expires: 1 });
        cookieManager.set(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, { expires: 7 });

        return data.idToken;
    }

};

export default authService;