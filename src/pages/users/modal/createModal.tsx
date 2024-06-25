import {
  TextField,
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { EmployeeProps, IFormCreateUsers } from "../interfaces";
import DialogContainer from "../../../components/dialog";
import { FormModal } from "../styles";
import { ICreateModalProps } from "../../../components/dialog/styles";
import { findAllEmployeeNotPaginated } from "../../../services/employees";
import { MenuProps, listRoles } from "../../../utils/helps";
import { useEffect, useState } from "react";
import { createUser } from "../../../services/users";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const defaultValues = {
  username: "",
  password: "",
  status: "ativo",
  roles: "",
  employeeId: "",
};

export function CreateModal({
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
  setPage,
}: ICreateModalProps) {
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
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
  } = useForm<IFormCreateUsers>({
    defaultValues,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const fetchEmployees = async () => {
    try {
      const response = await findAllEmployeeNotPaginated();
      console.log("employee:", response.data.employees);

      if (response && response.data) {
        setEmployees(response.data.employees);
      }
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
    }
  };

  const onSubmit: SubmitHandler<IFormCreateUsers> = async (data) => {
    setLoading(true);
    try {
      const response = await createUser({
        ...data,
      });
      if (response.status === 201) {
        setPage(0);
        setDataRefresh(!dataRefresh);
        setOpen(false);
        reset();
        setAlert({
          open: true,
          message: "Usuário cadastrado com sucesso.",
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
    fetchEmployees();
  }, []);

  return (
    <DialogContainer
      open={open}
      title="Cadastrar usuário"
      subtitle="Preencha o formulário do usuário."
    >
      <FormModal onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/*  */}

          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="employeeId">Funcionário</InputLabel>
              <Select
                labelId="employeeId"
                id="employeeId"
                label="Funcionário"
                MenuProps={MenuProps}
                {...register("employeeId", {
                  required: {
                    value: true,
                    message: "🛈 Campo é obrigatório.",
                  },
                  minLength: {
                    value: 3,
                    message: "🛈 Campo tem menos de 3 caracters.",
                  },
                  maxLength: {
                    value: 100,
                    message: "🛈 Campo excedeu o limite de 100 caracteres.",
                  },
                })}
                error={!!errors?.employeeId}
                defaultValue={
                  errors?.employeeId ? errors?.employeeId.message : null
                }
              >
                <MenuItem value="">
                  <em>Selecione o funcionário</em>
                </MenuItem>
                {employees.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.employeeId && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.7rem",
                    marginLeft: "1rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {errors.employeeId.message}
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="username"
              label="Usuário"
              placeholder="Digite seu usuário..."
              size="small"
              fullWidth
              {...register("username", {
                required: {
                  value: true,
                  message: "🛈 Campo é obrigatório.",
                },
                maxLength: {
                  value: 50,
                  message: "🛈 Campo excedeu o limite de caracters.",
                },
                minLength: {
                  value: 3,
                  message: "🛈 Campo tem menos de 3 caracters.",
                },
              })}
              error={!!errors?.username}
              helperText={errors?.username ? errors?.username.message : null}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="password-id"
              label="Senha"
              placeholder="Digite sua senha..."
              size="small"
              fullWidth
              type={showPassword ? "text" : "password"}
              variant="outlined"
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
                  value: 3,
                  message: "🛈 Campo tem menos de 3 caracters.",
                },
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors?.password.message : null}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="rolesId">Permissão</InputLabel>
              <Select
                labelId="rolesId"
                id="rolesId"
                label="Permissão"
                {...register("roles", {
                  required: {
                    value: true,
                    message: "🛈 Campo é obrigatório.",
                  },
                  minLength: {
                    value: 3,
                    message: "🛈 Campo tem menos de 3 caracters.",
                  },
                  maxLength: {
                    value: 50,
                    message: "🛈 Campo excedeu o limite de 50 caracteres.",
                  },
                })}
                error={!!errors?.roles}
                defaultValue={errors?.roles ? errors?.roles.message : null}
              >
                <MenuItem value="">
                  <em>Selecione item</em>
                </MenuItem>
                {listRoles.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.roles && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.7rem",
                    marginLeft: "1rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {errors.roles.message}
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="status"
              label="Status"
              type="text"
              variant="outlined"
              fullWidth
              size="small"
              disabled
              {...register("status", {
                required: {
                  value: true,
                  message: "🛈 Campo é obrigatório.",
                },
                minLength: {
                  value: 3,
                  message: "🛈 Campo tem menos de 3 caracters.",
                },
                maxLength: {
                  value: 150,
                  message: "🛈 Campo excedeu o limite de 150 caracteres.",
                },
              })}
              error={!!errors?.status}
              helperText={errors?.status ? errors?.status.message : null}
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
                Cadastrando...
              </>
            ) : (
              "Cadastrar"
            )}
          </Button>
        </Box>
      </FormModal>
    </DialogContainer>
  );
}
