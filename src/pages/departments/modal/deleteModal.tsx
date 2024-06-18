import axios from "axios";
import { useCallback } from "react";
import { IDeleteModalProps } from "../interfaces";
import { deleteDepartment } from "../../../services/departments";
import DialogContainer from "../../../components/dialog";
import { FormFooter } from "../styles";
import { Button, Typography } from "@mui/material";
import { COLORS } from "../../../themes/colors";

export function DeleteModal({
  department,
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
      const response = await deleteDepartment(department.id);

      if (response.status === 200) {
        setDataRefresh(!dataRefresh);
        setOpen(false);
        setAlert({
          open: true,
          message: "Departamento deletado com sucesso",
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
  }, [department]);

  return (
    <DialogContainer open={open} titleDelete="Deletar departamento" width="34rem">
      <Typography>
        Deseja deletar o departamento:
        <span
          style={{
            color: COLORS.NEUTRAL_800,
            fontWeight: "bold",
            marginLeft: "0.5rem",
          }}
        >
          {department.code}
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
