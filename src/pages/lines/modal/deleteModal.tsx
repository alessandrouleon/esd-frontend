import axios from "axios";
import { useCallback } from "react";
import { IDeleteModalProps } from "../interfaces";
import DialogContainer from "../../../components/dialog";
import { FormFooter } from "../styles";
import { Button, Typography } from "@mui/material";
import { COLORS } from "../../../themes/colors";
import { deleteLine } from "../../../services/lines";

export function DeleteModal({
  line,
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
      const response = await deleteLine(line.id);

      if (response.status === 200) {
        setDataRefresh(!dataRefresh);
        setOpen(false);
        setAlert({
          open: true,
          message: "Linha deletada com sucesso",
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
  }, [line]);

  return (
    <DialogContainer open={open} titleDelete="Deletar turno" width="34rem">
      <Typography>
        Deseja deletar o turno:
        <span
          style={{
            color: COLORS.NEUTRAL_800,
            fontWeight: "bold",
            marginLeft: "0.5rem",
          }}
        >
          {line.code}
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
