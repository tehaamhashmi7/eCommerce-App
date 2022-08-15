import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import React, { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UserContext from "./UserContext";

function Login() {

  const context = useContext(UserContext)

  const {UserLogin} = context

  const [showPassword, setShow] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (eve) => {
    setCredentials({ ...credentials, [eve.target.name]: eve.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    await UserLogin(credentials.email, credentials.password)
  }

  return (
    <Paper sx={{ padding: "32px" }} elevation={2}>
      <Grid container>
        <Grid item lg={3} md={1} sm={0} xs={0}></Grid>
        <Grid item lg={6} md={10} sm={12} xs={12}>
          <Box>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              component={"h4"}
              p={2}
            >
              Login
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3} direction="column" p={1}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="email"
                  type={"email"}
                  value={credentials.email}
                  onChange={handleChange}
                  label="E-mail"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={handleChange}
                  label="Password"
                  InputProps={{
                    endAdornment: showPassword ? (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShow(false);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShow(true);
                          }}
                        >
                          <VisibilityOffIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack spacing={2} direction="row" p={1}>
                <Button
                  type="submit"
                  disabled={
                    credentials.email == "" || credentials.password == ""
                  }
                  sx={{ type: "submit", width: "48%" }}
                  variant="contained"
                  color="success"
                >
                  Submit
                </Button>
                <Button
                  sx={{ width: "48%" }}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    setCredentials({
                      email: "",
                      password: "",
                    })
                  }
                >
                  Reset
                </Button>
              </Stack>
            </form>
          </Box>
        </Grid>
        <Grid item lg={3} md={1} sm={0} xs={0}></Grid>
      </Grid>
    </Paper>
  );
}

export default Login;
