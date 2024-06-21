import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { EmployeeProps } from "../interfaces";
import { formatTime } from "../../../utils/date";
import { COLORS } from "../../../themes/colors";

interface Column {
  id:
    | "id"
    | "name"
    | "registration"
    | "boot"
    | "bracelete"
    | "status"
    | "occupation"
    | "shiftId"
    | "departmentId"
    | "lineId"
    | "createdAt"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
  renderCell?: (params: { row: EmployeeProps }) => React.ReactNode;
}

export const columns: readonly Column[] = [
  {
    id: "registration",
    label: "Matrícula",
    minWidth: 30,
    align: "center",
  },
  { id: "name", label: "Nome", minWidth: 170, align: "center" },
  {
    id: "occupation",
    label: "Ocupação",
    minWidth: 50,
    align: "center",
  },
  {
    id: "boot",
    label: "Bota",
    minWidth: 10,
    align: "center",
  },
  {
    id: "bracelete",
    label: "Pulseira",
    minWidth: 10,
    align: "center",
  },
  {
    id: "departmentId",
    label: "Departamento",
    minWidth: 50,
    align: "center",
  },
  {
    id: "shiftId",
    label: "Turno",
    minWidth: 50,
    align: "center",
  },
  {
    id: "lineId",
    label: "Linha",
    minWidth: 50,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 20,
    align: "center",
    renderCell: (params) => {
      return params.row.status === "ativo" ? (
        <HowToRegIcon style={{ color: COLORS.SUCCESS_A700 }} />
      ) : (
        <PersonOffIcon style={{ color: COLORS.NEUTRAL_400 }} />
      );
    },
  },
  {
    id: "createdAt",
    label: "Data de criação",
    minWidth: 200,
    align: "center",
    renderCell: (params) => {
      return formatTime(params.row.createdAt);
    },
  },

  {
    id: "actions",
    label: "Ações",
    minWidth: 100,
    align: "center",
  },
];
