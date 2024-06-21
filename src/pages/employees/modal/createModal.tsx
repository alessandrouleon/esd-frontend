import {
  TextField,
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormCreateEmployee } from "../interfaces";
import DialogContainer from "../../../components/dialog";
import { FormModal } from "../styles";
import { ICreateModalProps } from "../../../components/dialog/styles";
import { createEmployee } from "../../../services/employees";
import {
  MenuProps,
  listBoot,
  listBracelete,
  listOcupacao,
} from "../../../utils/helps";
import { useEffect, useState } from "react";
import { findAllDepartmentNotPaginated } from "../../../services/departments";
import { DepartmentProps } from "../../departments/interfaces";
import { findAllShiftNotPaginated } from "../../../services/shifts";
import { ShiftProps } from "../../shifts/interfaces";
import { findAllLinesNotPaginated } from "../../../services/lines";
import {  LineProps } from "../../lines/interfaces";


export function CreateModal({
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
  setPage,
}: ICreateModalProps) {
    const [departments, setDepartments] = useState<DepartmentProps[]>([]);
    const [shifts, setShifts] = useState<ShiftProps[]>([]);
    const [lines, setLines] = useState<LineProps[]>([]);
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormCreateEmployee>({
    defaultValues: {
      name: "",
      registration: "",
      boot: "",
      bracelete: "",
      status: "ativo",
      occupation: "",
      imageId: "",
      shiftId: "",
      departmentId: "",
      lineId: "",
    },
  });

  const fetchDepartments = async () => {
    try {
      const response = await findAllDepartmentNotPaginated();
      if (response && response.data) {
        setDepartments(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
    }
  };

const fetchShifts = async () => {
    try {
      const response = await findAllShiftNotPaginated();
      if (response && response.data) {
        setShifts(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar turnos:", error);
    }
  };

  const fetchLines = async () => {
    try {
      const response = await findAllLinesNotPaginated();
      if (response && response.data) {
        setLines(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
    }
  };

  const onSubmit: SubmitHandler<IFormCreateEmployee> = async (data) => {
    try {       
      const response = await createEmployee(data);
      if (response.status === 201) {
        setPage(0);
        setDataRefresh(!dataRefresh);
        setOpen(false);
        reset();
        setAlert({
          open: true,
          message: "Funcionário cadastrado com sucesso.",
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

  useEffect(() => {
    fetchDepartments();
    fetchShifts();
    fetchLines();
  }, []);


  return (
    <DialogContainer
      open={open}
      title="Cadastrar funcionário"
      subtitle="Preencha o formulário de funcionário."
    >
      <FormModal onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Nome"
              type="text"
              variant="outlined"
              fullWidth
              size="small"
              {...register("name", {
                required: {
                  value: true,
                  message: "🛈 Campo é obrigatório.",
                },
                maxLength: {
                  value: 150,
                  message: "🛈 Campo excedeu o limite de 150 caracteres.",
                },
              })}
              error={!!errors?.name}
              helperText={errors?.name ? errors?.name.message : null}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="registration"
              label="Matrícula"
              type="text"
              variant="outlined"
              fullWidth
              size="small"
              {...register("registration", {
                required: {
                  value: true,
                  message: "🛈 Campo é obrigatório.",
                },
                minLength: {
                  value: 6,
                  message: "🛈 Campo precisa ter 6 números.",
                },
              })}
              error={!!errors?.registration}
              helperText={
                errors?.registration ? errors?.registration.message : null
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="occupationId">Ocupação</InputLabel>
              <Select
                labelId="occupationId"
                id="occupationId"
                label="Ocupação"
                MenuProps={MenuProps}
                {...register("occupation", {
                  required: {
                    value: true,
                    message: "🛈 Campo é obrigatório.",
                  },
                  maxLength: {
                    value: 100,
                    message: "🛈 Campo excedeu o limite de 100 caracteres.",
                  },
                })}
                error={!!errors?.occupation}
                defaultValue={
                  errors?.occupation ? errors?.occupation.message : null
                }
              >
                <MenuItem value="">
                  <em>Selecione item</em>
                </MenuItem>
                {listOcupacao.map((item: string) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
              {errors.occupation && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.7rem",
                    marginLeft: "1rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {errors.occupation.message}
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="bootId">Bota</InputLabel>
              <Select
                labelId="bootId"
                id="bootId"
                label="Bota"
                {...register("boot", {
                  required: {
                    value: true,
                    message: "🛈 Campo é obrigatório.",
                  },
                  maxLength: {
                    value: 3,
                    message: "🛈 Campo excedeu o limite de 3 caracteres.",
                  },
                })}
                error={!!errors?.boot}
                defaultValue={errors?.boot ? errors?.boot.message : null}
              >
                <MenuItem value="">
                  <em>Selecione item</em>
                </MenuItem>
                {listBoot.map((item: string) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
              {errors.boot && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.7rem",
                    marginLeft: "1rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {errors.boot.message}
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="braceleteId">Pulseira</InputLabel>
              <Select
                labelId="braceleteId"
                id="braceleteId"
                label="Pulseira"
                {...register("bracelete", {
                  required: {
                    value: true,
                    message: "🛈 Campo é obrigatório.",
                  },
                  maxLength: {
                    value: 3,
                    message: "🛈 Campo excedeu o limite de 3 caracteres.",
                  },
                })}
                error={!!errors?.bracelete}
                defaultValue={
                  errors?.bracelete ? errors?.bracelete.message : null
                }
              >
                <MenuItem value="">
                  <em>Selecione item</em>
                </MenuItem>
                {listBracelete.map((item: string) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
              {errors.bracelete && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.7rem",
                    marginLeft: "1rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {errors.bracelete.message}
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="imageId"
              label="Image"
              type="text"
              variant="outlined"
              fullWidth
              size="small"
              {...register("imageId", {
                required: {
                  value: true,
                  message: "🛈 Campo é obrigatório.",
                },
                minLength: {
                  value: 6,
                  message: "🛈 Campo precisa ter 6 números.",
                },
              })}
              error={!!errors?.imageId}
              helperText={errors?.imageId ? errors?.imageId.message : null}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="departmentId">Departamento</InputLabel>
              <Select
                labelId="departmentId"
                id="departmentId"
                label="Departamento"
                MenuProps={MenuProps}
                {...register("departmentId", {
                  required: {
                    value: true,
                    message: "🛈 Campo é obrigatório.",
                  },
                  maxLength: {
                    value: 100,
                    message: "🛈 Campo excedeu o limite de 100 caracteres.",
                  },
                })}
                error={!!errors?.departmentId}
                defaultValue={
                  errors?.departmentId ? errors?.departmentId.message : null
                }
              >
                <MenuItem value="">
                  <em>Selecione item</em>
                </MenuItem>
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.description}
                  </MenuItem>
                ))}
              </Select>
              {errors.departmentId && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.7rem",
                    marginLeft: "1rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {errors.departmentId.message}
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
              <FormControl fullWidth size="small">
              <InputLabel id="lineId">Linha</InputLabel>
              <Select
                labelId="lineId"
                id="lineId"
                label="Departamento"
                MenuProps={MenuProps}
                {...register("lineId", {
                  required: {
                    value: true,
                    message: "🛈 Campo é obrigatório.",
                  },
                  maxLength: {
                    value: 100,
                    message: "🛈 Campo excedeu o limite de 100 caracteres.",
                  },
                })}
                error={!!errors?.lineId}
                defaultValue={
                  errors?.lineId ? errors?.lineId.message : null
                }
              >
                <MenuItem value="">
                  <em>Selecione item</em>
                </MenuItem>
                {lines.map((line) => (
                  <MenuItem key={line.id} value={line.id}>
                    {line.code}
                  </MenuItem>
                ))}
              </Select>
              {errors.lineId && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.7rem",
                    marginLeft: "1rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {errors.lineId.message}
                </p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
             <FormControl fullWidth size="small">
              <InputLabel id="shiftId">Turno</InputLabel>
              <Select
                labelId="shiftId"
                id="shiftId"
                label="Turno"
                MenuProps={MenuProps}
                {...register("shiftId", {
                  required: {
                    value: true,
                    message: "🛈 Campo é obrigatório.",
                  },
                  maxLength: {
                    value: 100,
                    message: "🛈 Campo excedeu o limite de 100 caracteres.",
                  },
                })}
                error={!!errors?.shiftId}
                defaultValue={
                  errors?.shiftId ? errors?.shiftId.message : null
                }
              >
                <MenuItem value="">
                  <em>Selecione item</em>
                </MenuItem>
                {shifts.map((shift) => (
                  <MenuItem key={shift.id} value={shift.id}>
                    {shift.description}
                  </MenuItem>
                ))}
              </Select>
              {errors.shiftId && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.7rem",
                    marginLeft: "1rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {errors.shiftId.message}
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
          <Button sx={{ ml: 2 }} variant="contained" type="submit">
            Cadastra
          </Button>
        </Box>
      </FormModal>
    </DialogContainer>
  );
}
