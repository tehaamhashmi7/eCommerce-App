import {
  Box,
  Paper,
  TextField,
  Typography,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UserContext from "./context/UserContext";

function SignUp() {

  const context = useContext(UserContext)

  const {UserSignup} = context

  const [signuptoken, setToken] = useState(false)

  const [showPassword, setShow] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
    acceptTnC: false,
  });

  
  const handleChange = (eve) => {
    setCredentials({ ...credentials, [eve.target.name]: eve.target.value });
  };

  // useEffect(() => {
  //   async function register() {
  //     await UserSignup(credentials.username, credentials.email, credentials.password)
  //   }
  //   register()
  // }, [signuptoken])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await UserSignup(credentials.username, credentials.email, credentials.password)
  }

  return (
    <Paper sx={{ padding: "32px" }} elevation={0}>
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
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3} direction="column" p={1}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="username"
                  type={"text"}
                  value={credentials.username}
                  onChange={handleChange}
                  label="Username"
                />
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
                  error={credentials.password !== credentials.confirmPass}
                  helperText={credentials.password !== credentials.confirmPass?"Passwords do not match": ""}
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
                <TextField
                  variant="outlined"
                  fullWidth
                  name="confirmPass"
                  type={showPassword ? "text" : "password"}
                  value={credentials.confirmPass}
                  onChange={handleChange}
                  label="Confirm Password"
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

                <FormControlLabel
                  label="I accept the terms and conditions"
                  control={
                    <Checkbox
                      name="acceptTnC"
                      checked={credentials.acceptTnC}
                      onChange={() =>
                        setCredentials({
                          ...credentials,
                          ["acceptTnC"]: !credentials.acceptTnC,
                        })
                      }
                    />
                  }
                />

                <Stack spacing={2} direction="row" p={1}>
                  <Button
                    type="submit"
                    disabled={
                      credentials.username == "" ||
                      credentials.email == "" ||
                      credentials.password == "" ||
                      credentials.acceptTnC == false ||
                      credentials.password !== credentials.confirmPass
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
                        username: "",
                        email: "",
                        password: "",
                        confirmPass: "",
                        acceptTnC: credentials.acceptTnC
                      })
                    }
                  >
                    Reset
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Grid>
        <Grid item lg={3} md={1} sm={0} xs={0}></Grid>
      </Grid>
    </Paper>
  );
}

export default SignUp;
