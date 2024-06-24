// Definição completa do tipo dos dados do funcionário
export interface EmployeeProps {
  id: string;
  name: string;
  registration: string;
  boot: string;
  bracelete: string;
  status: string;
  occupation: string;
  imageId?: string;
  shiftId: string;
  departmentId: string;
  lineId: string;
  actions: string;
}

export interface IUsersProps {
  id?: string;
  username: string;
  password?: string;
  status: string;
  roles: string;
  employeeId: string;
  Employee?: EmployeeProps;
  occupation?: string;
  createdAt: string;
  actions: string;
}

interface IUsersData {
  users: IUsersProps[];
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export const initialStateData: IUsersData = {
  users: [],
  total: 0,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
  lastPage: 0,
};

export interface IFormCreateUsers {
  username: string;
  password: string;
  status: string;
  roles: string;
  employeeId: string;
  Employee?: EmployeeProps;
}

export interface IFormUpdateUsers {
  id: string;
  username: string;
  password: string;
  status: string;
  roles: string;
  employeeId: string;
  Employee?: EmployeeProps;
}

export const initialUsersUpdate: IFormUpdateUsers = {
  id: "",
  username: "",
  password: "",
  status: "",
  roles: "",
  employeeId: "",
};

export interface IEditModalProps {
  user: IFormUpdateUsers;
  open: boolean;
  setOpen: (open: boolean) => void;
  setAlert: (data: {
    open: boolean;
    message: string;
    type: "error" | "success";
  }) => void;
  setDataRefresh: (refresh: boolean) => void;
  dataRefresh: boolean;
}

export interface IDeleteModalProps {
  user: IFormUpdateUsers;
  open: boolean;
  setOpen: (open: boolean) => void;
  setAlert: (data: {
    open: boolean;
    message: string;
    type: "error" | "success";
  }) => void;
  setDataRefresh: (refresh: boolean) => void;
  dataRefresh: boolean;
}

export interface UserExport {
  username: string;
  password: string;
  status: string;
  roles: string;
  employeeId: string;
  Employee?: EmployeeProps;
}
