import React, { useState } from "react";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// import Icon from "@mui/material/Icon";
import { AccessAlarm, Star } from "@mui/icons-material";

import { setAuthToken } from "@/storage/tokenStorage";
import { login } from "@/services/authService";
import { customConsole } from "@/utils/console";

const ariaLabel = { "aria-label": "description" };

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const response = await login(username, password);

      setAuthToken(response.data.token);
      customConsole.log("Login successful");
    } catch (error) {
      customConsole.error("Login", { error });
      setErrorMessage(error as string);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <h2>Login</h2>
      <Box component="form" noValidate autoComplete="off">
        <Star color="primary" />
        <AccessAlarm />
        <Input
          placeholder="username"
          inputProps={ariaLabel}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="password"
          inputProps={ariaLabel}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="outlined" onClick={handleLogin}>
          Outlined
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
