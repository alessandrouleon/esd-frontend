import api from "../api";
import { UserToken } from "../localStorage";
import { ICreateEmployeeProps, IUpdateEmployeeProps } from "./interfaces";

//endpoint usando para exibir foto do usuario logado
export const getSingleRegistration = async (id: string) => {
    const response = await api.get(`employees/${id}`);
    return response;
  };

  export const createEmployee = async (data: ICreateEmployeeProps) => {
    return await api.post(`/employees/`, data);
  };
  
  export const updateEmployee = async (id: string, data: IUpdateEmployeeProps) => {
    return await api.patch(`/employees/${id}`, {
      name: data.name.trim(),
    registration: data.registration.trim(),
    boot: data.boot.trim(),
    bracelete: data.bracelete.trim(),
    status: data.status.trim(),
    occupation: data.occupation.trim(),
    imageId: data.imageId?.trim(),
    shiftId: data.shiftId.trim(),
    departmentId: data.departmentId.trim(),
    lineId: data.lineId.trim(),
    });
  };
  
  export const deleteEmployee = async (id: string) => {
    return await api.delete(`/employees/${id}`);
  };
  
  export const findManyEmployee = async (page: number) => {
    return await api.get(`/employees/search/${page}`);
  };
  
  export const searchForEmployee = async (page: number, value: string) => {
    return await api.get(`/employees/search/${page}?value=${value}`);
  };
  
  export const findAllEmployeeNotPaginated = async () => {
    return await api.get(`/employees/allEmployee`);
  };
  
  export async function uploadEmployee(file: File) {
    const formData = new FormData();
    formData.append("file", file);
  
    const token = UserToken.getLocalStorageToken();
  
    return await api.post("/employees/upload/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  