import React, { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "../services/api";
import { signOut } from "./Auth";

export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: string | null;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const storaged = localStorage.getItem("@auth:esd");
  
  useEffect(() => {
    if (storaged) {
      const [, payload] = storaged.split(".");
      const decoded = JSON.parse(atob(payload));
      const timeNow = new Date().getTime();

      if (decoded && decoded.exp * 1000 > timeNow) {
        api.defaults.headers.Authorization = `Bearer ${storaged}`;
        setUser(decoded.username);
      } else {
        signOut();
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

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
