import { IFormUpdateShift } from "../../pages/shifts/interfaces";
import api from "../api";
import { ICreateShift } from "./interfaces";

export const createShift = async (data: ICreateShift) => {
  return await api.post(`/shifts/`, data);
};

export const updateShift = async (id: string, data: IFormUpdateShift) => {
  return await api.patch(`/shifts/${id}`, {
    code: data.code.trim(),
    description: data.description.trim(),
  });
};

export const deleteShift = async (id: string) => {
  return await api.delete(`/shifts/${id}`);
};

export const findManyShift = async (page: number) => {
  return await api.get(`/shifts/search/${page}`);
};
