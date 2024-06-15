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


export interface IFormCreateShift {
  code: string;
  description: string;
}

export interface IFormUpdateShift {
  id: string;
  code: string;
  description: string;
}

export const initialShiftUpdate: IFormUpdateShift = {
  id: '',
  code: '',
  description: ''
};

export interface IEditModalProps {
  shift: IFormUpdateShift;
  open: boolean;
  setOpen: (open: boolean) => void;
  setAlert: (data: { open: boolean; message: string; type: 'error' | 'success' }) => void;
  setDataRefresh: (refresh: boolean) => void;
  dataRefresh: boolean;
}



export interface IDeleteModalProps {
  shift: IFormUpdateShift;
  open: boolean;
  setOpen: (open: boolean) => void;
  setAlert: (data: { open: boolean; message: string; type: 'error' | 'success' }) => void;
  setDataRefresh: (refresh: boolean) => void;
  dataRefresh: boolean;
}