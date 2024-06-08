import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { COLORS } from "../../shared/themes/colors";
import FundoLogin from "../../assets/fundo-login.svg";
import { login } from "../../services/Login";
import { UserToken } from "../../services/LocalStorage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "../../components/Alert";

interface IFormTextField {
  username: string;
  password: string;
}

const initialStateAlert = {
  open: false,
  message: "",
  type: "error" as "error" | "success",
};

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(initialStateAlert);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormTextField> = async (data) => {
    try {
      const response = await login(data);
      const [, payload] = response.data.token.split(".");
      const decoded = JSON.parse(atob(payload));

      if (response.data.token && response.data.token.length !== 0) {
        UserToken.setLocalStorageToken(response.data.token);
        UserToken.setLocalStorageName(decoded.username);
        navigate("/dashBoard");
      } else {
        setAlert({
          open: true,
          message: "Falha ao realizar login.",
          type: "error",
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        height: "100vh",
      }}
    >
      <Alert
        open={alert.open}
        onClose={() => setAlert({ ...alert, open: false })}
        message={alert.message}
        type={alert.type}
      />
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        width="60%"
        height="70%"
        sx={{
          background: COLORS.BACKGROUND_DARK,
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box component="img" src={FundoLogin} alt="Fundo Login" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: COLORS.BACKGROUND_DARK,
              padding: 3,
              gap: "1.5rem",
            }}
            width="100%"
          >
            <Typography
              variant="h5"
              fontWeight={500}
              color={COLORS.NEUTRAL_800}
              textAlign="center"
              mb={2}
            >
              Gerenciador ESD
            </Typography>

            <Typography
              fontWeight={400}
              fontSize={15}
              color={COLORS.NEUTRAL_700}
              mb={5}
              textAlign="center"
            >
              Informe seu usuário e senha para acessar o sistema
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} width="100%">
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
                  helperText={
                    errors?.password ? errors?.password.message : null
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    padding: "0.5rem 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  fullWidth
                >
                  Acessar
                  <SendIcon
                    style={{
                      marginLeft: "0.8rem",
                    }}
                  />
                </Button>
              </Stack>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
