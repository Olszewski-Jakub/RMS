import axiosInstance from '../config/apiConfig';

const wallsService = {
    create : async (x1, y1, x2, y2) => {
        const response = await axiosInstance.post(`/walls`, {
            x1,
            y1,
            x2,
            y2
        });
        return response.data.data;
    },

    getAll : async () => {
        const response = await axiosInstance.get(`/walls`);
        return response.data.data;
    },

    get : async (id) => {
        const response = await axiosInstance.get(`/walls/${id}`);
        return response.data.data;
    },

    update : async (id, x1, y1, x2, y2) => {
        const response = await axiosInstance.put(`/walls/${id}`, {
            x1,
            y1,
            x2,
            y2
        });
        return response.data.data;
    },

    delete : async (id) => {
        const response = await axiosInstance.delete(`/walls/${id}`);
        return response.data.data;
    }
}

export default wallsService;