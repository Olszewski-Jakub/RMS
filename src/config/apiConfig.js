import axios from 'axios';
import authService from '../services/authService';

const apiConfig = {
    baseURL: "https://us-central1-restaurant-management-sy-1a0cd.cloudfunctions.net/app"
};

const axiosInstance = axios.create({
    baseURL: apiConfig.baseURL,
});

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