import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import UserContext from "./context/UserContext";

function AddProduct() {

    const context = useContext(UserContext)

    const {addProduct} = context


  const [credentials, setCredentials] = useState({
    title: "",
    brand: "",
    company: "",
  });

  const handleChange = (eve) => {
    setCredentials({ ...credentials, [eve.target.name]: eve.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(credentials.title, credentials.brand, credentials.company)
  };

  return (
    <Paper sx={{ padding: "32px" }} elevation={0}>
      <Grid container>
        <Grid item lg={3} md={1} sm={0} xs={0}></Grid>
        <Grid item lg={6} md={10} sm={12} xs={12}>
          <Stack spacing={4} textAlign="center">
            <Typography variant="h3">Add Product</Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3} direction="column" p={1}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="title"
                  type={"text"}
                  value={credentials.title}
                  onChange={handleChange}
                  label="Product Title"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  name="brand"
                  type={"text"}
                  value={credentials.brand}
                  onChange={handleChange}
                  label="Product Brand"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  name="company"
                  type={"text"}
                  value={credentials.company}
                  onChange={handleChange}
                  label="Product Company"
                />
              </Stack>
              <Stack spacing={2} direction="row" p={1}>
                <Button
                  type="submit"
                  disabled={
                    credentials.title == "" ||
                    credentials.brand == "" ||
                    credentials.company == ""
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
                      title: "",
                      brand: "",
                      company: "",
                    })
                  }
                >
                  Reset
                </Button>
              </Stack>
            </form>
          </Stack>
        </Grid>
        <Grid item lg={3} md={1} sm={0} xs={0}></Grid>
      </Grid>
    </Paper>
  );
}

export default AddProduct;
