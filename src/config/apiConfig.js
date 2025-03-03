import axios from 'axios';
import authService from '../services/authService';
import cookieManager from "../utils/cookieManager";
import COOKIE_KEYS from "../constants/cookieKeys";
const apiConfig = {
    baseURL: "https://api-d4o6tbc5fq-uc.a.run.app"
};

const axiosInstance = axios.create({
    baseURL: apiConfig.baseURL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const authHeader = cookieManager.get(COOKIE_KEYS.ID_TOKEN); // Ensure this function returns the correct header
        if (authHeader) {
            config.headers['Authorization'] = "Bearer " + authHeader;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await authService.refreshToken();
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;