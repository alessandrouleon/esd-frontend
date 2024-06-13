export interface Shift {
  id: string;
  code: string;
  description: string;
  createdAt: string;
  actions: string;
}

interface IUpData {
  shifts: Shift[];
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export const initialStateData: IUpData = {
  shifts: [],
  total: 0,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
  lastPage: 0,
};