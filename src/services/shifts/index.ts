import api from "../api";

  export const findManyShift = async (page: number ) => {
   const res =  await api.get(
      `/shifts/search/${page}`
    );
    return res;
  };
