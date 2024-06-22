import axios from "axios";
import { useCallback } from "react";
import { IDeleteModalProps } from "../interfaces";
import DialogContainer from "../../../components/dialog";
import { FormFooter } from "../styles";
import { Button, Typography } from "@mui/material";
import { COLORS } from "../../../themes/colors";
import { deleteEmployee } from "../../../services/employees";

export function DeleteModal({
  employee,
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
}: IDeleteModalProps) {
  const handleClose = () => {
    setOpen(false);
    setDataRefresh(!dataRefresh);
  };

  const handleDelete = useCallback(async () => {
    try {
      const response = await deleteEmployee(employee.id);

      if (response.status === 200) {
        setDataRefresh(!dataRefresh);
        setOpen(false);
        setAlert({
          open: true,
          message: "Funcionário deletada com sucesso",
          type: "success",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        setAlert({
          open: true,
          message: message || "Internal server error",
          type: "error",
        });
      }
    }
  }, [employee]);

  return (
    <DialogContainer open={open} titleDelete="Deletar funcionário" width="34rem">
      <Typography>
        Deseja deletar o funcionário:
        <span
          style={{
            color: COLORS.NEUTRAL_800,
            fontWeight: "bold",
            marginLeft: "0.5rem",
          }}
        >
          {employee.name}
        </span>
        ?
      </Typography>

      <FormFooter>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleDelete}>
          Deletar
        </Button>
      </FormFooter>
    </DialogContainer>
  );
}
