import axiosInstance from '../config/apiConfig';

const doorService =  {
    create : async (x, y, width, height, rotation) => {
        const response = await axiosInstance.post(`/doors`, {
            x,
            y,
            width,
            height,
            rotation
        });
        return response.data.data;
    },

    getAll : async () => {
        const response = await axiosInstance.get(`/doors`);
        return response.data.data;
    },

    get : async (id) => {
        const response = await axiosInstance.get(`/doors/${id}`);
        return response.data.data;
    },

    update : async (id, x, y, width, height, rotation) => {
        const response = await axiosInstance.put(`/doors/${id}`, {
            x,
            y,
            width,
            height,
            rotation
        });
        return response.data.data;
    },

    delete : async (id) => {
        const response = await axiosInstance.delete(`/doors/${id}`);
        return response.data.data;
    }
}

export default doorService;