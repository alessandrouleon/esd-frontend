import { IFormUpdateLine } from "../../pages/lines/interfaces";
import api from "../api";
import { UserToken } from "../localStorage";
import { ILinesProps } from "./interfaces";

export const createLine = async (data: ILinesProps) => {
  return await api.post(`/lines/`, data);
};

export const updateLine = async (id: string, data: IFormUpdateLine) => {
  return await api.patch(`/lines/${id}`, {
    code: data.code.trim(),
    description: data.description.trim(),
  });
};

export const deleteLine = async (id: string) => {
  return await api.delete(`/lines/${id}`);
};

export const findManyLines = async (page: number) => {
  return await api.get(`/lines/search/${page}`);
};

export const searchForLines = async (page: number, value: string) => {
  return await api.get(`/lines/search/${page}?value=${value}`);
};

export const findAllLinesNotPaginated = async () => {
  return await api.get(`/lines/allLines`);
};

export async function uploadLine(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const token = UserToken.getLocalStorageToken();

  return await api.post("/lines/upload/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}

