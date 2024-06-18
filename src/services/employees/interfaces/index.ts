export interface ICreateEmployeeProps {
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

  export interface IUpdateEmployeeProps extends ICreateEmployeeProps {
    id: string;
  }