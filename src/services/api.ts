import axios, { AxiosRequestHeaders } from "axios";
import { UserToken } from "./LocalStorage";
import { signOut } from "../contexts/auth";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_PORT_PROJECT_BACKEND}`,
});

api.interceptors.request.use(
  (config) => {
    const token = UserToken.getLocalStorageToken();
    if (token) {
      if (config.headers) {
        (config.headers as AxiosRequestHeaders)[
          "Authorization"
        ] = `Bearer ${token}`;
      } else {
        config.headers = {
          Authorization: `Bearer ${token}`,
        } as AxiosRequestHeaders;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      signOut();
    }
    return Promise.reject(error);
  }
);

export default api;
