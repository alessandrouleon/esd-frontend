import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { IUsersProps } from "../interfaces";
import { formatTime } from "../../../utils/date";
import { COLORS } from "../../../themes/colors";

interface Column {
  id:
    | "id"
    | "username"
    | "status"
    | "roles"
    | "occupation"
    | "createdAt"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
  renderCell?: (params: { row: IUsersProps }) => React.ReactNode;
}

export const columns: readonly Column[] = [
  {
    id: "username",
    label: "Nome de Usuário",
    minWidth: 30,
    align: "center",
  },
  {
    id: "occupation",
    label: "Ocupação",
    minWidth: 50,
    align: "center",
  },
  {
    id: "roles",
    label: "Permição",
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
