import axiosInstance from '../config/apiConfig';

const floorPlanService = {
    get : async () => {
        const response = await axiosInstance.get(`/floorPlan`);
        return response.data.data;
    }
}

export default floorPlanService;