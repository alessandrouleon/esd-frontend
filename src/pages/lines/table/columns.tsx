import { LineProps } from "../interfaces";

interface Column {
  id: "id" | "code" | "description" | "createdAt" | "actions";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
  renderCell?: (params: { row: LineProps }) => React.ReactNode;
}

export const columns: readonly Column[] = [
  // { id: "id", label: "ID", minWidth: 170 },
  { id: "code", label: "Código", minWidth: 100, align: "center" },
  {
    id: "description",
    label: "Descrição",
    minWidth: 170,
    align: "center",
  },
  {
    id: "createdAt",
    label: "Data de criação",
    minWidth: 200,
    align: "center",
  },
  {
    id: "actions",
    label: "Ações",
    minWidth: 100,
    align: "center",
  },
];
