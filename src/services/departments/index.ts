import { IFormUpdateDepartment } from "../../pages/departments/interfaces";
import api from "../api";
import { UserToken } from "../localStorage";
import { ICreateDepartment } from "./interfaces";

export const createDepartment = async (data: ICreateDepartment) => {
  return await api.post(`/departments/`, data);
};

export const updateDepartment = async (id: string, data: IFormUpdateDepartment) => {
  return await api.patch(`/departments/${id}`, {
    code: data.code.trim(),
    description: data.description.trim(),
  });
};

export const deleteDepartment = async (id: string) => {
  return await api.delete(`/departments/${id}`);
};

export const findManyDepartment = async (page: number) => {
  return await api.get(`/departments/search/${page}`);
};

export const searchForDepartment = async (page: number, value: string) => {
  return await api.get(`/departments/search/${page}?value=${value}`);
};

export const findAllDepartmentNotPaginated = async () => {
  return await api.get(`/departments/allDepartment`);
};

export async function uploadDepartment(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const token = UserToken.getLocalStorageToken();

  return await api.post("/departments/upload/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}

