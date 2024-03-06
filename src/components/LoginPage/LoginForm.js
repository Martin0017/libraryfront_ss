import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../global";
import { getData, postData, postDataWhitoutToken } from "../../services/api";

const theme = createTheme();

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [full, setFull] = useState(false);
  const [wrg, setWrg] = useState();
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFull(false);
  };

  const login = async (e) => {
    e.preventDefault();
    const token = await postDataWhitoutToken(`${BASE_URL}/api/v1/auth/signin`,inputs);
    if(token === null){
      setFull(true);
      setWrg("Correo o contraseña incorrecto");
    }else{
      handleIsOnlineAndTakeAnToken(token);
    }
  };

    const handleIsOnlineAndTakeAnToken = async (message) => {
      window.localStorage.setItem("token", message.token);
      window.localStorage.setItem("user", inputs.email);
      const userEmail = {};
      userEmail.emailUser = inputs.email;
      const getUser = await postData(`${BASE_URL}/users/byemail`,userEmail,message.token);
      if(getUser.roleUser === 'ADMIN'){
        navigate("/user");
        window.location.reload();
      }else{
        navigate("/loanabook");
        window.location.reload();
      }
      
    };

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://2.bp.blogspot.com/-Gvx1WV-VUOw/V5WdeMzhtbI/AAAAAAAAMx0/v3Q85UZZ8YclfnuVcqcy9XgxhNXo49cEQCLcB/s1600/69368079.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            component="form"
            onSubmit={login}
            onChange={changeForm}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesion
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo"
                name="email"
                autoComplete="email"
                inputProps={{ maxLength: 40 }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                inputProps={{ maxLength: 20 }}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    to="/signup"
                    variant="body2"
                    style={{ textDecoration: "none", color: "gray" }}
                  >
                    {"No tiene una cuenta? Registrese"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={full} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error">
          {wrg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

