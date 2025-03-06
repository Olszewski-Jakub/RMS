import axiosInstance from '../config/apiConfig';

const windowsService = {
    create: async (x, y, width, height, rotation) => {
        const response = await axiosInstance.post(`/windows`, {
            x,
            y,
            width,
            height,
            rotation
        });
        return response.data.data;
    },

    getAll: async () => {
        const response = await axiosInstance.get(`/windows`);
        return response.data.data;
    },

    get: async (id) => {
        const response = await axiosInstance.get(`/windows/${id}`);
        return response.data.data;
    },

    update: async (id, x, y, width, height, rotation) => {
        const response = await axiosInstance.put(`/windows/${id}`, {
            x,
            y,
            width,
            height,
            rotation
        });
        return response.data.data;
    },

    delete: async (id) => {
        const response = await axiosInstance.delete(`/windows/${id}`);
        return response.data.data;
    }
}

export default windowsService;
