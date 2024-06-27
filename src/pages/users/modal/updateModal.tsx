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
} from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler, DefaultValues } from "react-hook-form";
import {
  EmployeeProps,
  IEditModalProps,
  IFormUpdateUsers,
} from "../interfaces";
import DialogContainer from "../../../components/dialog";
import { FormModal } from "../styles";
import { findAllEmployeeNotPaginated } from "../../../services/employees";
import { MenuProps, listRoles, listStatus } from "../../../utils/helps";
import { useCallback, useEffect, useState } from "react";
import { updateUser } from "../../../services/users";

export function UpdateModal({
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
  user,
}: IEditModalProps) {
  const defaultValues: DefaultValues<IFormUpdateUsers> = {
    ...user,
  };
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormUpdateUsers>({
    defaultValues,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await findAllEmployeeNotPaginated();
      if (response && response.data) {
        setEmployees(response.data.employees);
      }
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
    }
  }, []);

  const onSubmit: SubmitHandler<IFormUpdateUsers> = async (data) => {
    setLoading(true);
    try {
      const response = await updateUser(user.id, {
        ...data,
      });
      if (response.status === 200) {
        setDataRefresh(!dataRefresh);
        setOpen(false);
        reset();
        setAlert({
          open: true,
          message: "Usuário alterado com sucesso.",
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
  }, [fetchEmployees]);

  return (
    <DialogContainer
      open={open}
      title="Editar usuário"
      subtitle="Preencha o formulário do usuário."
    >
      {employees.length < 1 ? (
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            width: 450,
            height: 200,
          }}
        >
          <CircularProgress size={24} sx={{ mr: 1 }} />
        </Box>
      ) : (
        <>
          <FormModal onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} width={450}>
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
                    })}
                    error={!!errors?.employeeId}
                    defaultValue={defaultValues.employeeId}
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
              <Grid item xs={12}>
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
                  helperText={
                    errors?.username ? errors?.username.message : null
                  }
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
                    defaultValue={defaultValues.roles}
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
                <FormControl fullWidth size="small">
                  <InputLabel id="statusId">Status</InputLabel>
                  <Select
                    labelId="statusId"
                    id="statusId"
                    label="Status"
                    {...register("status", {
                      required: {
                        value: true,
                        message: "🛈 Campo é obrigatório.",
                      },
                    })}
                    error={!!errors?.status}
                    defaultValue={defaultValues.status}
                  >
                    <MenuItem value="">
                      <em>Selecione item</em>
                    </MenuItem>
                    {listStatus.map((item) => (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.status && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "0.7rem",
                        marginLeft: "1rem",
                        marginTop: "0.2rem",
                      }}
                    >
                      {errors.status.message}
                    </p>
                  )}
                </FormControl>
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
        </>
      )}
    </DialogContainer>
  );
}
