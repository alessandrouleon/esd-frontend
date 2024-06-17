import { TextField, Box, Grid, Button } from "@mui/material";
import axios from "axios";

import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { IEditModalProps, IFormUpdateLine } from "../interfaces";
import { FormModal } from "../styles";
import { updateLine } from "../../../services/lines";
import DialogContainer from "../../../components/dialog";

export function UpdateModal({
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
  line,
}: IEditModalProps) {
  const defaultValues: DefaultValues<IFormUpdateLine> = line;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormUpdateLine>({
    defaultValues,
  });

  const handleClose = () => {
    setOpen(false);
    setDataRefresh(!dataRefresh);
  };

  const onSubmit: SubmitHandler<IFormUpdateLine> = async (data) => {
    try {
      const response = await updateLine(line.id, data);

      if (response.status === 200) {
        setDataRefresh(!dataRefresh);
        setOpen(false);
        setAlert({
          open: true,
          message: "Line alterada com sucesso",
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
  };

  return (
    <DialogContainer
      open={open}
      title="Editar Linha"
      subtitle="Edite o formulário de linha."
    >
      <FormModal onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="code"
              label="Código"
              type="text"
              variant="outlined"
              fullWidth
              size="small"
              {...register("code", {
                required: {
                  value: true,
                  message: "🛈 Campo é obrigatório.",
                },
                maxLength: {
                  value: 150,
                  message: "🛈 Campo excedeu o limite de 150 caracteres.",
                },
              })}
              error={!!errors?.code}
              helperText={errors?.code ? errors?.code.message : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Descrição"
              type="text"
              variant="outlined"
              fullWidth
              size="small"
              {...register("description", {
                required: {
                  value: true,
                  message: "🛈 Campo é obrigatório.",
                },
                minLength: {
                  value: 6,
                  message: "🛈 Campo precisa ter 6 números.",
                },
              })}
              error={!!errors?.description}
              helperText={
                errors?.description ? errors?.description.message : null
              }
            />
          </Grid>
        </Grid>

        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2rem",
          }}
        >
          <Button onClick={handleClose}>Cancelar</Button>
          <Button sx={{ ml: 2 }} variant="contained" type="submit">
           Salvar
          </Button>
        </Box>
      </FormModal>
    </DialogContainer>
  );
}
