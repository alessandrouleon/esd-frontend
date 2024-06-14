import api from "../api";
import { ICreateShift } from "./interfaces";

export const createShift = async (data: ICreateShift) => {
  return await api.post(`/shifts/`, data);
};

export const findManyShift = async (page: number) => {
  const res = await api.get(`/shifts/search/${page}`);
  return res;
};
