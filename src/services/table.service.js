import axiosInstance from '../config/apiConfig';

const tableService = {
    create : async (seats, nextToWindow, x, y, rotation,type) => {
        const response = await axiosInstance.post(`/table`, {
            seats,
            nextToWindow,
            x,
            y,
            rotation,
            type
        });
        return response.data.data;
    },

    getAll : async () => {
        const response = await axiosInstance.get(`/table`);
        return response.data.data;
    },

    get : async (id) => {
        const response = await axiosInstance.get(`/table/${id}`);
        return response.data.data;
    },

    update : async (id, seats, nextToWindow, x, y, rotation,type) => {
        const response = await axiosInstance.put(`/table/${id}`, {
            seats,
            nextToWindow,
            x,
            y,
            rotation,
            type
        });
        return response.data.data;
    },

    delete : async (id) => {
        const response = await axiosInstance.delete(`/table/${id}`);
        return response.data.data;
    },

    deactivate : async (id) => {
        const response = await axiosInstance.patch(`/table/deactivate/${id}`);
        return response.data.data;
    },

    activate : async (id) => {
        const response = await axiosInstance.patch(`/table/activate/${id}`);
        return response.data.data;
    }
}

export default tableService;