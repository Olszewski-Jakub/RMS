import cookieManager from '../utils/cookieManager';
import COOKIE_KEYS from '../constants/cookieKeys';
import axios from 'axios';
import axiosInstance from '../config/apiConfig';

const authService = {
    login: async (email, password) => {
        const response = await axios.post(`https://api-d4o6tbc5fq-uc.a.run.app/auth/login`, {
            email,
            password
        });
        const data = response.data.data;
        cookieManager.set(COOKIE_KEYS.ID_TOKEN, data.idToken, {expires: 1});
        cookieManager.set(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, {expires: 7});
        return data;
    },
    register: async (formData) => {
        const code = formData.countryCode;
        const updatedFormData = {
            ...formData,
            phoneNumber: code + formData.phoneNumber,
        };

        const response = await axios.post(`https://api-d4o6tbc5fq-uc.a.run.app/auth/register`, updatedFormData);
        const data = response.data.data;
        return data;
    },
    logout: async () => {
        cookieManager.remove(COOKIE_KEYS.ID_TOKEN);
        cookieManager.remove(COOKIE_KEYS.REFRESH_TOKEN);
        cookieManager.remove(COOKIE_KEYS.USER)
    },
    refreshToken: async () => {
        const refreshToken = cookieManager.get(COOKIE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.post(`https://api-d4o6tbc5fq-uc.a.run.app/auth/refreshToken`, {
            refreshToken: refreshToken
        });

        const data = response.data.data;
        cookieManager.set(COOKIE_KEYS.ID_TOKEN, data.idToken, {expires: 1});
        cookieManager.set(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, {expires: 7});

        return data.idToken;
    },
    createEmployee: async (formData) => {
        const response = await axiosInstance.post(`/auth/createEmployee`, formData);
        return response.data.data;
    },
    createOwner: async (formData) => {
        const response = await axiosInstance.post(`/auth/createOwner`, formData);
        return response.data.data;
    },
    deleteEmployee: async (uid) => {
        const response = await axiosInstance.delete(`/auth/deleteEmployee/${uid}`);
        return response.data.data;
    },
    google: async (idToken) => {
        const response = await axiosInstance.post(`/auth/google`, {
            idToken
        });
        const data = response.data.data;
        cookieManager.set(COOKIE_KEYS.ID_TOKEN, data.idToken, {expires: 1});
        cookieManager.set(COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, {expires: 7});
        return data;
    },
    forgotPassword: async (email) => {
        await axiosInstance.post(`/auth/forgotPassword`, {
            email
        });
    },
    deleteAccount: async () => {
        await axiosInstance.delete(`/auth/deleteAccount`);
    }
};

export default authService;