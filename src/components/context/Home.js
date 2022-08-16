import { Box, Typography, Stack, Button } from "@mui/material";
import React, { useContext } from "react";
import UserContext from "./UserContext";
import {Link} from 'react-router-dom'

function Home() {
  const context = useContext(UserContext);

  const { name } = context;

  const token = localStorage.getItem("token");

  return (
    <Box
      sx={{
        minHeight: "82vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {token ? (
        <Typography variant="h2">{token ? `Hi ${name}` : ""}</Typography>
      ) : (
        <Stack spacing={2} direction="row" p={1}>
          <Button sx={{ width: "48%" }} variant="contained" color="success">
            <Link
              key={"login"}
              style={{ textDecoration: "none", color: "white" }}
              to={"/login"}
            >
              Login
            </Link>
          </Button>
          <Button sx={{ width: "48%" }} variant="contained" color="primary">
            <Link
              key={"signup"}
              style={{ textDecoration: "none", color: "white" }}
              to={"/signup"}
            >
              Signup
            </Link>
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default Home;
