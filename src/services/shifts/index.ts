import { IFormUpdateShift } from "../../pages/shifts/interfaces";
import api from "../api";
import { UserToken } from "../localStorage";
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

export const searchForShift = async (page: number, value: string) => {
  return await api.get(`/shifts/search/${page}?value=${value}`);
};

export const findAllShiftNotPanitadet = async () => {
  return await api.get(`/shifts/allShift`);
};

export async function uploadShift(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const token = UserToken.getLocalStorageToken();

  return await api.post("/shifts/upload/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}

