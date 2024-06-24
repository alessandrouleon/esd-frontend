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
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { IEditModalProps, IFormUpdateEmployee } from "../interfaces";
import { FormModal, createImageFromBlob } from "../styles";
import DialogContainer from "../../../components/dialog";
import {
  findByEmployeeId,
  updateEmployee,
  uploadImageEmployee,
} from "../../../services/employees";
import { DepartmentProps } from "../../departments/interfaces";
import { useEffect, useState } from "react";
import { ShiftProps } from "../../shifts/interfaces";
import { LineProps } from "../../lines/interfaces";
import { findAllDepartmentNotPaginated } from "../../../services/departments";
import { findAllShiftNotPaginated } from "../../../services/shifts";
import { findAllLinesNotPaginated } from "../../../services/lines";
import InsertPhotoIcon from "../../../assets/profile-user.png";
import { COLORS } from "../../../themes/colors";
import {
  MenuProps,
  listBoot,
  listBracelete,
  listOcupacao,
  listStatus,
} from "../../../utils/helps";

export function UpdateModal({
  open,
  setOpen,
  setAlert,
  setDataRefresh,
  dataRefresh,
  employee,
}: IEditModalProps) {
  const defaultValues: DefaultValues<IFormUpdateEmployee> = {
    ...employee,
  };
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const [shifts, setShifts] = useState<ShiftProps[]>([]);
  const [lines, setLines] = useState<LineProps[]>([]);
  const [values, setValues] = useState<{ file: File | null }>({ file: null });
  const [loading, setLoading] = useState(false);
  const [employeeImage, setEmployeeImage] = useState();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormUpdateEmployee>({
    defaultValues,
  });

  const handleClose = () => {
    setOpen(false);
    setDataRefresh(!dataRefresh);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setValues({ ...values, file });
  };

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
      console.error("Erro ao buscar linha:", error);
    }
  };

  const getByEmployeeId = async () => {
    try {
      const response = await findByEmployeeId(employee.id);      
      if (response && response.data) {
        setEmployeeImage(response.data.imageId);
      }
    } catch (error) {
      console.error("Erro ao buscar linha:", error);
    }
  };

  const onSubmit: SubmitHandler<IFormUpdateEmployee> = async (data) => {
    setLoading(true);
    try {
      let supabaseImageId: string | null;

      if (!values.file) {
        supabaseImageId = null;
      } else {
        const fileImageEmployee = await uploadImageEmployee(values.file);
        supabaseImageId = fileImageEmployee.data.data.id;
      }

      const response = await updateEmployee(employee.id, {
        ...data,
        imageId: supabaseImageId,
      });

      if (response.status === 200) {
        setDataRefresh(!dataRefresh);
        setOpen(false);
        // reset();
        setAlert({
          open: true,
          message: "Funcionário alterado com sucesso.",
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
    getByEmployeeId();
    fetchDepartments();
    fetchShifts();
    fetchLines();
  }, []);

  return (
    <DialogContainer
      open={open}
      title="Editar funcionário"
      subtitle="Preencha o formulário de funcionário."
    >
      <FormModal onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="section-four">
              <div className="container-element">
                <img
                  className="model-img"
                  src={
                    values.file
                      ? createImageFromBlob(values.file)
                      : employee.imageId
                      ? employeeImage
                      : InsertPhotoIcon
                  }
                  alt="Avatar user"
                />

                <div>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  {values.file === null ? (
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="text"
                        component="span"
                        sx={{
                          width: 35,
                          height: 35,
                          borderRadius: "50%",
                          mb: -2,
                          ml: 8,
                          mt: -5,
                          minWidth: 0,
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: COLORS.PRIMARY_50,
                          bottom: -18,
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ImageSearchIcon />
                        </Box>
                      </Button>
                    </label>
                  ) : (
                    <Button
                      variant="text"
                      sx={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        mb: -2,
                        ml: 8,
                        mt: -5,
                        minWidth: 0,
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: COLORS.PRIMARY_50,
                        bottom: -18,
                        position: "relative",
                      }}
                      onClick={() => setValues({ ...values, file: "" || null })}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <DeleteOutlineIcon />
                      </Box>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Grid>
          {/*  */}
          <Grid item width="75%" sx={{ ml: 0, mr: 0, mt: 2 }}>
            <Grid item xs={12} mb={2}>
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
            {/*  */}
            <Grid container spacing={2}>
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
                    defaultValue={defaultValues.occupation}
                  >
                    <MenuItem value="">
                      <em>Selecione item</em>
                    </MenuItem>
                    {listOcupacao.map((item: string) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
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
            </Grid>

            {/*  */}
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
                defaultValue={defaultValues.boot}
              >
                <MenuItem value="">
                  <em>Selecione item</em>
                </MenuItem>
                {listBoot.map((item: string) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
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
                defaultValue={defaultValues.bracelete}
              >
                <MenuItem value="">
                  <em>Selecione item</em>
                </MenuItem>
                {listBracelete.map((item: string) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
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
                defaultValue={defaultValues.departmentId}
              >
                <MenuItem value="">
                  <em>Selecione item</em>
                </MenuItem>
                {departments.map((item) => (
                  <MenuItem value={item.id}>{item.description}</MenuItem>
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
                {listStatus.map((item: string) => (
                  <MenuItem key={item} value={item}>
                    {item}
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

          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="lineId">Linha</InputLabel>
              <Select
                labelId="lineId"
                id="lineId"
                label="Linha"
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
                defaultValue={defaultValues.lineId}
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
                defaultValue={defaultValues.shiftId}
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
