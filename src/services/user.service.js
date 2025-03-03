import axiosInstance from '../config/apiConfig';
import cookieManager from "../utils/cookieManager";
import COOKIE_KEYS from "../constants/cookieKeys";

const userService = {
    userDetails: async () => {
        const response = await axiosInstance.get("/user")
        cookieManager.set(COOKIE_KEYS.USER, response.data.data.privileges, { expires: 1 });
        return response.data.data;
    }
}

export default userService;