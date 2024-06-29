import api from "../api";

export const findManyTestEsds = async (page: number) => {
  return await api.get(`/testEsd/search/${page}`);
};

export const searchForTestEsds = async (page: number, value: string) => {
  return await api.get(`/testEsd/search/${page}?value=${value}`);
};
