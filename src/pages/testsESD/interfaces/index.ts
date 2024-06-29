// Definição completa do tipo dos dados do funcionário
interface ModelTableProps {
  id: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
}
interface Shift extends ModelTableProps {}

interface Department extends ModelTableProps {}

interface Line extends ModelTableProps {}

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
  Shift?: Shift;
  departmentId: string;
  Department?: Department;
  lineId: string;
  Line?: Line;
  actions: string;
}

export interface ITestEsdProps {
  id: string;
  boot: string;
  bracelete: string;
  employeeId?: string;
  Employee?: EmployeeProps;
  name?: string;
  department: string;
  line?: string;
  shift?: string;
  createdAt: string;
}

interface ITestEsdData {
  testEsd: ITestEsdProps[];
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export const initialStateData: ITestEsdData = {
  testEsd: [],
  total: 0,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
  lastPage: 0,
};

export interface TestEsdExport {
  // username: string;
  // password: string;
  // status: string;
  // roles: string;
  // employeeId: string;
  // Employee?: EmployeeProps;
  // createdAt: string;
  boot: string;
  bracelete: string;
  employeeId?: string;
  Employee?: EmployeeProps;
  name?: string;
  department: string;
  line?: string;
  shift?: string;
  createdAt: string;
}