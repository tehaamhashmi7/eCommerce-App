import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import UserContext from "./context/UserContext";
import { display } from "@mui/system";

function DisplayProducts() {
  const ref = useRef(null);
  const refClose = useRef(null);

  const [details, setDetails] = useState({});

  const [myProducts, setProducts] = useState([]);

  const [reload, setLoad] = useState(0);

  const context = useContext(UserContext);

  const { displayProducts, deleteProduct, updateProduct } = context;

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setLoad(reload + 1);
  };

  const update = async (id, title, brand, company) => {
    await updateProduct(id, title, brand, company);
    refClose.current.click();
    setLoad(reload + 1);
  };

  const updateArticle = (det) => {
    ref.current.click();
    console.log(det);
    setDetails(det);
  };

  const handleChange = (eve) => {
    setDetails({ ...details, [eve.target.name]: eve.target.value });
  };

  useEffect(() => {
    async function display() {
      let pro = await displayProducts();
      setProducts(pro);
    }
    display();
  }, [reload]);

  return (
    <Paper sx={{ padding: "32px" }} elevation={2}>
      <Grid container>
        <Grid item lg={1} md={1} sm={0} xs={0}></Grid>
        <Grid item lg={10} md={10} sm={12} xs={12}>
          <button
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            ref={ref}
          >
            Launch demo modal
          </button>

          <Box
            p={5}
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <Box className="modal-dialog">
              <Box className="modal-content">
                <Box className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update Product
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ref={refClose}
                  ></button>
                </Box>
                <Box className="modal-body">
                  <Stack spacing={3} direction="column" p={1}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="title"
                      type={"text"}
                      value={details.title}
                      onChange={handleChange}
                      label="Product Title"
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="brand"
                      type={"text"}
                      value={details.brand}
                      onChange={handleChange}
                      label="Product Brand"
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="company"
                      type={"text"}
                      value={details.company}
                      onChange={handleChange}
                      label="Product Company"
                    />
                  </Stack>
                </Box>
                <Box className="modal-footer">
                  <IconButton
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    <CancelIcon sx={{ color: "red" }} />
                  </IconButton>
                  <IconButton
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      update(
                        details._id,
                        details.title,
                        details.brand,
                        details.company
                      )
                    }
                  >
                    <CheckCircleIcon color="success" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
          <Stack spacing={2} textAlign="center">
            <Typography variant="h3">My Products</Typography>
            <Grid container>
              {myProducts.map((product) => {
                let details = product;
                return (
                  <Grid p={1} item m={1} lg={4} md={6} sm={12} xs={12}>
                    <Card sx={{ bgcolor: "smoke" }}>
                      <CardContent>
                        <Typography variant="h4">{product.title}</Typography>
                        <Typography variant="h5">{product.brand}</Typography>
                        <Typography variant="h5">{product.company}</Typography>
                      </CardContent>
                      <Stack direction={"row-reverse"}>
                        <CardActions>
                          <IconButton onClick={() => updateArticle(details)}>
                            <EditIcon color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(product._id)}>
                            <DeleteForeverIcon color="primary" />
                          </IconButton>
                        </CardActions>
                      </Stack>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </Grid>
        <Grid item lg={1} md={1} sm={0} xs={0}></Grid>
      </Grid>
    </Paper>
  );
}

export default DisplayProducts;
