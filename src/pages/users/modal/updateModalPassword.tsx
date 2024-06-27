import {
  TextField,
  Box,
  Grid,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import {
  IEditModalPasswordProps,
  IFormUpdateUsersPassword,
  IUsersProps,
} from "../interfaces";
import DialogContainer from "../../../components/dialog";
import { FormModal } from "../styles";
import { useCallback, useEffect, useState } from "react";
import { findByUserId, updateUserPassword } from "../../../services/users";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function UpdateModalPassword({
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
  userPass,
}: IEditModalPasswordProps) {
  const defaultValues: DefaultValues<IFormUpdateUsersPassword> = {
    ...userPass,
  };
  const [users, setUsers] = useState<IUsersProps[]>([]);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormUpdateUsersPassword>({
    defaultValues,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const fetchUsers = useCallback(async () => {
    try {
      const response = await findByUserId(userPass.id);

      const { username } = response.data;
      console.log("user::", username);

      if (response && response.data) {
        setUsers(username);
      }
    } catch (error) {
      console.error("Erro ao buscar usuario:", error);
    }
  }, []);

  const onSubmit: SubmitHandler<IFormUpdateUsersPassword> = async (data) => {
    setLoading(true);
    try {
      const response = await updateUserPassword(userPass.id, {
        ...data,
      });
      if (response.status === 200) {
        setDataRefresh(!dataRefresh);
        setOpen(false);
        reset();
        setAlert({
          open: true,
          message: "Senha do usuário alterada com sucesso.",
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <DialogContainer open={open} title="Editar Senha do usuário">

      <FormModal onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} width={350}>
        <Grid item xs={12}>
        <TextField
          id="username"
          label="Nome de Usuário"
          size="small"
          fullWidth
          variant="outlined"
          disabled
          value={users}
        />
      </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Nova Senha"
              placeholder="Digite sua nova senha..."
              size="small"
              fullWidth
              type={showPassword ? "text" : "password"}
              variant="outlined"
              defaultValue=""
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { fontSize: 14 },
              }}
              {...register("password", {
                required: {
                  value: true,
                  message: "🛈 Campo é obrigatório.",
                },
                maxLength: {
                  value: 50,
                  message: "🛈 Campo excedeu o limite de caracters.",
                },
                minLength: {
                  value: 4,
                  message: "🛈 Campo tem menos de 4 caracters.",
                },
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors?.password.message : null}
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
          <Button
            disabled={loading}
            sx={{ ml: 2 }}
            variant="contained"
            type="submit"
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                Salvando...
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        </Box>
      </FormModal>
    </DialogContainer>
  );
}
