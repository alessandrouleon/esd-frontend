import api from "../api";
import { UserToken } from "../localStorage";
import { ICreateUsersProps, IUpdateUsersProps } from "./interfaces";

//endpoint usando para exibir foto do usuario logado
export const createUser = async (data: ICreateUsersProps) => {
  return await api.post(`/users/`, data);
};


export const updateUser = async (
  id: string,
  data: IUpdateUsersProps
) => {
  return await api.patch(`/users/${id}`, {
    username: data.username.trim(),
    status: data.status.trim(),
    roles: data.roles.trim(),
    employeeId: data.employeeId.trim(),
  });
};

// export const findByEmployeeId = async (id: string) => {
//   return await api.get(`/employees/${id}`);
// };

export const deleteUser = async (id: string) => {
  return await api.delete(`/users/${id}`);
};

export const findManyUsers = async (page: number) => {
  return await api.get(`/users/search/${page}`);
};

export const searchForUsers = async (page: number, value: string) => {
  return await api.get(`/users/search/${page}?value=${value}`);
};

export const findAllUsersNotPaginated = async () => {
  return await api.get(`/users/allEmployee`);
};

export async function uploadUsers(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const token = UserToken.getLocalStorageToken();

  return await api.post("/users/upload/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}
