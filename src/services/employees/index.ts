import api from "../api";

export const getSingleRegistration = async (id: string) => {
    const response = await api.get(`employees/${id}`);
    return response;
  };