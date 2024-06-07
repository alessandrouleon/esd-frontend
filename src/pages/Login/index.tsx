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
import { COLORS } from "../../shared/themes/colors";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FundoLogin from "../../assets/fundo-login.svg";

export function Login() {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async () => {
    try {
      if (!username) {
        setError(true);
      } else {
        setError(false);
      }
    } catch (error) {
      () => {};
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

            <Stack spacing={2} width="100%">
              <TextField
                id="username"
                label="Usuário"
                placeholder="Digite seu usuário..."
                size="small"
                fullWidth
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (e.target.value) {
                    setError(false);
                  }
                }}
                error={error}
                helperText={error ? "Preencha o campo vazio" : ""}
                variant="outlined"
              />
              <TextField
                id="password-id"
                label="Senha"
                placeholder="Digite sua senha..."
                size="small"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value) {
                    setError(false);
                  }
                }}
                error={error}
                helperText={error ? "Preencha o campo vazio" : ""}
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
              />

              <Button
                variant="contained"
                sx={{
                  padding: "0.5rem 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                fullWidth
                onClick={onSubmit}
              >
                Acessar
                <SendIcon
                  style={{
                    marginLeft: "0.8rem",
                  }}
                />
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
