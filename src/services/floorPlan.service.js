import axiosInstance from '../config/apiConfig';

const floorPlanService = {
    get : async () => {
        const response = await axiosInstance.get(`/floor-plan`);
        return response.data.data;
    }
}

export default floorPlanService;