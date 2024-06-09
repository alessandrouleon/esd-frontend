import * as jwt from "jsonwebtoken";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { api } from "../services/api";
import { signOut } from "./Auth";

interface User {
  token: string;
}

export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: User | null;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("@auth:esd");

  const getNewToken = useCallback(() => {
    api
      .post("/auth", { token })
      .then((response) => {
        if (response.status === 201) {
          setUser(response.data);
          localStorage.setItem("@auth:esd", JSON.stringify(response.data));
          api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
          setLoading(false);
        }
      })
      .catch(() => {
        signOut();
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    setLoading(true);
    if (!user) {
      const storaged = localStorage.getItem("@auth:esd");
      const timeNow = new Date().getTime();

      if (storaged && token) {
        const parsedStoraged: User = JSON.parse(storaged);
        const { exp } = jwt.decode(parsedStoraged.token) as { exp: number };
        if (exp * 1000 >= timeNow) {
          api.defaults.headers.Authorization = `Bearer ${parsedStoraged.token}`;
          setUser(parsedStoraged);
          setLoading(false);
        } else {
          getNewToken();
        }
      } else if (token) {
        getNewToken();
      } else {
        localStorage.clear();
        window.location.href = `${import.meta.env.VITE_APP_FRONTEND_URL}`;
      }
    }
  }, [user, token, getNewToken]);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loading,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
