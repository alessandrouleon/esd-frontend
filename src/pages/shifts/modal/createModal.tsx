import { TextField, Box, Grid, Button } from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { createShift } from "../../../services/shifts";
import { IFormCreateShift } from "../interfaces";
import DialogContainer from "../../../components/dialog";
import { FormModal } from "../styles";
import { ICreateModalProps } from "../../../components/dialog/styles";

export function CreateModal({
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
  setPage,
}: ICreateModalProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormCreateShift>({
    defaultValues: {
      code: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<IFormCreateShift> = async (data) => {
    try {
      const response = await createShift(data);
      if (response.status === 201) {
        setPage(0);
        setDataRefresh(!dataRefresh);
        setOpen(false);
        reset();
        setAlert({
          open: true,
          message: "Turno cadastrado com sucesso.",
          type: "success",
        });
      }
    } catch (error) {
      let msg: string | undefined;

      if (axios.isAxiosError(error)) msg = error?.response?.data?.message[0];
      else if (error instanceof Error) msg = error.message;

      setAlert({
        open: true,
        message: msg || "Internal server error",
        type: "error",
      });
    }
  };

  return (
    <DialogContainer
      open={open}
      title="Cadastrar turno"
      subtitle="Preencha o formulário de turno."
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
            Cadastra
          </Button>
        </Box>
      </FormModal>
    </DialogContainer>
  );
}
