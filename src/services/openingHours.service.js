import axiosInstance from '../config/apiConfig';

const openingHoursService = {
    getAll: async () => {
        const response = await axiosInstance.get(`/openingHours`);
        return response.data.data;
    },
    get: async (id) => {
        const response = await axiosInstance.get(`/openingHours/${id}`);
        return response.data.data;
    },
    add: async (startTime, endTime, day) => {
        const response = await axiosInstance.post(`/openingHours`, {
            startTime,
            endTime,
            day
        });
        return response.data.data;
    },
    update: async (id, startTime, endTime, day) => {
        const response = await axiosInstance.put(`/openingHours/${id}`, {
            startTime,
            endTime,
            day
        },);
        return response.data.data;
    },
    delete: async (id) => {
        const response = await axiosInstance.delete(`/openingHours/${id}`);
        return response.data.data;
    },
}

export default openingHoursService;