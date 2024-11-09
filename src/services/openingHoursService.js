import axiosInstance from '../config/apiConfig';

const openingHoursService = {
    getAll: async () => {
        const response = await axiosInstance.get(`/openingHours`);
        const data = response.data.data;
        return data;
    },
    get: async (id) => {
        const response = await axiosInstance.get(`/openingHours/${id}`);
        const data = response.data.data;
        return data;
    },
    add: async (startTime, endTime, day) => {
        const response = await axiosInstance.post(`/openingHours`, {
            startTime,
            endTime,
            day
        });
        const data = response.data.data;
        return data;
    },
    update: async (id, startTime, endTime, day) => {
        const response = await axiosInstance.patch(`/openingHours/${id}`, {
            startTime,
            endTime,
            day
        });
        const data = response.data.data;
        return data;
    },
    delete: async (id) => {
        const response = await axiosInstance.delete(`/openingHours/${id}`);
        const data = response.data.data;
        return data;
    },
}

export default openingHoursService;