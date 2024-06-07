import { api } from "../api";
import { UserProps } from "./interfaces";

export const login = ({ username, password }: UserProps) => {
  return api.post("auth/login-user", { username, password });
};
