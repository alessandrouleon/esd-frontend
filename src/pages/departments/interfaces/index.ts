export interface DepartmentProps {
    id: string;
    code: string;
    description: string;
    createdAt: string;
    actions: string;
  }
  
  interface IDepartmentData{
    departments: DepartmentProps[];
    total: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    lastPage: number;
  }
  
  export const initialStateData: IDepartmentData = {
    departments: [],
    total: 0,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    lastPage: 0,
  };
  
  
  export interface IFormCreateDepartment {
    code: string;
    description: string;
  }
  
  export interface IFormUpdateDepartment {
    id: string;
    code: string;
    description: string;
  }
  
  export const initialDepartmentUpdate: IFormUpdateDepartment = {
    id: '',
    code: '',
    description: ''
  };
  
  export interface IEditModalProps {
    department: IFormUpdateDepartment;
    open: boolean;
    setOpen: (open: boolean) => void;
    setAlert: (data: { open: boolean; message: string; type: 'error' | 'success' }) => void;
    setDataRefresh: (refresh: boolean) => void;
    dataRefresh: boolean;
  }
  
  
  
  export interface IDeleteModalProps {
    department: IFormUpdateDepartment;
    open: boolean;
    setOpen: (open: boolean) => void;
    setAlert: (data: { open: boolean; message: string; type: 'error' | 'success' }) => void;
    setDataRefresh: (refresh: boolean) => void;
    dataRefresh: boolean;
  }
  
  export interface DepartmentExport {
    code: string;
    description: string;
    createdAt: string;
  }
  