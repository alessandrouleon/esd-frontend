export interface ICreateUsersProps {
  username: string;
  password?: string;
  status: string;
  roles: string;
  employeeId: string;
}

export interface IUpdateUsersProps extends ICreateUsersProps {
  id: string;
}
