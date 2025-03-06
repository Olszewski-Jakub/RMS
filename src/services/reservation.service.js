import axiosInstance from '../config/apiConfig';

const reservationService = {
    create: async (tableId, startTime, endTime, people) => {
        const response = await axiosInstance.post(`/reservation/create`, {
            tableId,
            startTime,
            endTime,
            people
        });
        return response.data.data;
    }, 
    cancel: async (reservationId) => {
        const response = await axiosInstance.post(`/reservation/cancel/${reservationId}`);
        return response.data.data;
    },
    confirm: async (reservationId) => {
        const response = await axiosInstance.post(`/reservation/confirm/${reservationId}`);
        return response.data.data;
    },
    complete: async (reservationId) => {
        const response = await axiosInstance.post(`/reservation/complete/${reservationId}`);
        return response.data.data;
    },
    reschedule: async (reservationId, date, time) => {
        const response = await axiosInstance.post(`/reservation/reschedule/${reservationId}`, {
            date,
            time
        });
        return response.data.data;
    },
    get: async (reservationId) => {
        const response = await axiosInstance.get(`/reservation/get/${reservationId}`);
        return response.data.data;
    },
    getFreeTables: async (startTime, endTime,seats) => {
        const response = await axiosInstance.post(`/reservation/free-tables`, {
            startTime,
            endTime,
            seats: parseInt(seats,10)
        });
        return response.data.data;
    },
    getAll: async () => {
        const response = await axiosInstance.get(`/reservation/all`);
        return response.data.data;
    },
    getByStatus: async (status) => {
        const response = await axiosInstance.get(`/reservation/${status}`)
        return response.data.data;
    }
};

export default reservationService;
