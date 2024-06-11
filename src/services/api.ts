import axios, { AxiosRequestHeaders } from "axios";
import { UserToken } from "./localStorage";
import { signOut } from "../contexts/Auth";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_PORT_PROJECT_BACKEND}`,
});

api.interceptors.request.use(
  (config) => {
    const access_token = UserToken.getLocalStorageToken();
    if (access_token) {
      if (config.headers) {
        (config.headers as AxiosRequestHeaders)[
          "Authorization"
        ] = `Bearer ${access_token}`;
      } else {
        config.headers = {
          Authorization: `Bearer ${access_token}`,
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
