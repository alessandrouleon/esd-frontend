import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { ITestEsdProps } from "../interfaces";
import { formatDateTime } from "../../../utils/date";
import { COLORS } from "../../../themes/colors";
import { CustomChip } from "../components/Chips";

interface Column {
  id:
    | "id"
    | "name"
    | "department"
    | "shift"
    | "line"
    | "boot"
    | "bracelete"
    | "createdAt";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
  renderCell?: (params: { row: ITestEsdProps }) => React.ReactNode;
}

export const columns: readonly Column[] = [
  {
    id: "name",
    label: "Nome",
    minWidth: 30,
    align: "center",
  },
  {
    id: "department",
    label: "Departamento",
    minWidth: 50,
    align: "center",
  },
  {
    id: "shift",
    label: "Turno",
    minWidth: 50,
    align: "center",
  },
  {
    id: "line",
    label: "Line",
    minWidth: 50,
    align: "center",
  },
  {
    id: "boot",
    label: "Bota antiestática",
    minWidth: 30,
    align: "center",
    renderCell: (params) => {
      return params.row.boot === "OK" ? (
        <CustomChip
          label="OK"
          icon={<CheckCircleIcon style={{ color: COLORS.SUCCESS_A700 }} />}
          color={COLORS.SUCCESS_A100}
        />
      ) : params.row.boot === "NOK" ? (
        <CustomChip
          label="NOK"
          icon={<ErrorIcon style={{ color: COLORS.SECONDARY_500 }} />}
          color={COLORS.SECONDARY_50}
        />
      ) : (
        <CustomChip
          label="N/A"
          icon={<RemoveCircleIcon style={{ color: COLORS.NEUTRAL_700 }} />}
          color={COLORS.NEUTRAL_200}
        />
      );
    },
  },
  {
    id: "bracelete",
    label: "Pulseira antiestática",
    minWidth: 50,
    align: "center",
    renderCell: (params) => {
      return params.row.bracelete === "OK" ? (
        <CustomChip
          label="OK"
          icon={<CheckCircleIcon style={{ color: COLORS.SUCCESS_A700 }} />}
          color={COLORS.SUCCESS_A100}
        />
      ) : params.row.bracelete === "NOK" ? (
        <CustomChip
          label="NOK"
          icon={<ErrorIcon style={{ color: COLORS.SECONDARY_500 }} />}
          color={COLORS.SECONDARY_50}
        />
      ) : (
        <CustomChip
          label="N/A"
          icon={<RemoveCircleIcon style={{ color: COLORS.NEUTRAL_700 }} />}
          color={COLORS.NEUTRAL_200}
        />
      );
    },
  },
  {
    id: "createdAt",
    label: "Data de Teste",
    minWidth: 200,
    align: "center",
    renderCell: (params) => {
      return formatDateTime(params.row.createdAt);
    },
  },
];
