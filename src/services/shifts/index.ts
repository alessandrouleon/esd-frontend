import { IFormUpdateShift } from "../../pages/shifts/interfaces";
import api from "../api";
import { ICreateShift } from "./interfaces";

export const createShift = async (data: ICreateShift) => {
  return await api.post(`/shifts/`, data);
};

export const updateShift = async ( id: string, data : IFormUpdateShift) => {
  const res = await api.patch(`/shifts/${id}`, {
    code: data.code.trim(),
    description: data.description.trim(),
  });
  console.log("Update, no service", res);
  return res;
};



export const findManyShift = async (page: number) => {
  const res = await api.get(`/shifts/search/${page}`);
  return res;
};
