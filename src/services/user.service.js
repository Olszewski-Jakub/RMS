import axiosInstance from '../config/apiConfig';
import cookieManager from "../utils/cookieManager";
import COOKIE_KEYS from "../constants/cookieKeys";

const userService = {
    userDetails: async () => {
        const response = await axiosInstance.get("/user");
        cookieManager.set(COOKIE_KEYS.USER, response.data.data.privileges, { expires: 1 });
        return response.data.data;
    },

    getAllUsers: async () => {
        const response = await axiosInstance.get("/user/all");
        return response.data.data;
    },

    getAllPrivilegedUsers: async () => {
        const response = await axiosInstance.get("/user/privileged");
        return response.data.data;
    },

    changePrivilege: async (userId, privilege) => {
        const response = await axiosInstance.put(`/user/${userId}/privilege`, {privilege: privilege});
        return response.data.data;
    }
};

export default userService;