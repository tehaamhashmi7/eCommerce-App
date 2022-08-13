import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Stack, Toolbar, Typography, Box } from "@mui/material";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState } from "react";

function Nav() {
  const [open, toggleOpen] = useState(false);

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Profile", path: "/profile" },
    { name: "Products", path: "/products" },
    { name: "Add Products", path: "/products/add" },
    { name: "Update Products", path: "/products/Update" },
    { name: "Logout", path: "/logout" }
  ];

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" component={"div"} sx={{ flexGrow: 1 }}>
          eCommerce App
        </Typography>
        <Hidden mdDown>
          <Stack direction={"row"} spacing="3">
            {navigationLinks.map((data, index) => {
              return (
                <Button
                  key={index}
                  variant="text"
                  size="medium"
                  color="inherit"
                >
                  <Link key={data.path}
                    style={{ textDecoration: "none", color: "white" }}
                    to={data.path}
                  >
                    {data.name}
                  </Link>
                </Button>
              );
            })}
          </Stack>
        </Hidden>
        <Hidden mdUp>
          <IconButton onClick={() => toggleOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <SwipeableDrawer
        open={open}
        anchor={"right"}
        onOpen={() => toggleOpen(true)}
        onClose={() => toggleOpen(false)}
      >
        <IconButton onClick={() => toggleOpen(false)}>
          <MenuOpenIcon />
        </IconButton>
        <Divider />
        <Stack direction={"column"} spacing="2" p={4}>
          {navigationLinks.map((data, index) => {
            return (
              <Box>
                <Button key={index} variant="text" size="medium">
                  <Link key={data.name}
                    style={{ "text-decoration": "none", color: "black" }}
                    to={data.path}
                  >
                    {data.name}
                  </Link>
                </Button>
                <Divider />
              </Box>
            );
          })}
        </Stack>
      </SwipeableDrawer>
    </AppBar>
  );
}

export default Nav;
