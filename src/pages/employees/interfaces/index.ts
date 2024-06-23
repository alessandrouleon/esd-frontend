// Definição completa do tipo dos dados do funcionário
interface ModelTableProps {
  id: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
}
interface Shift extends ModelTableProps{}

interface Department extends ModelTableProps{}

interface Line extends ModelTableProps{}

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
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  Shift?: Shift;
  Department?: Department;
  Line?: Line;
}

interface IEmployeeData {
  employees: EmployeeProps[];
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export const initialStateData: IEmployeeData = {
  employees: [],
  total: 0,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
  lastPage: 0,
};

export interface IFormCreateEmployee {
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
}

export interface IFormUpdateEmployee {
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
}

export const initialEmployeeUpdate: IFormUpdateEmployee = {
  id: "",
  name: "",
  registration: "",
  boot: "",
  bracelete: "",
  status: "",
  occupation: "",
  imageId: "",
  shiftId: "",
  departmentId: "",
  lineId: "",
};

export interface IEditModalProps {
  employee: IFormUpdateEmployee;
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
  employee: IFormUpdateEmployee;
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

export interface EmployeeExport {
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
  createdAt: string;
  Shift?: Shift;
  Department?: Department;
  Line?: Line;
}