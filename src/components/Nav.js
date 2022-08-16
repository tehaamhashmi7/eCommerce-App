import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Stack,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UserContext from "./context/UserContext";
import { display } from "@mui/system";

function Nav() {
  const context = useContext(UserContext)
  const {UserLogout} = context

  const navigate = useNavigate()

  const [open, toggleOpen] = useState(false);

  const [anchorProfile, toggleProfile] = useState(null);
  const [anchorProducts, toggleProducts] = useState(null);

  const openProfile = Boolean(anchorProfile);
  const openProducts = Boolean(anchorProducts);

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Profile", path: "/profile" },
    { name: "Products", path: "/products" },
  ];

  const productLinks = [
    { name: "Display Products", path: "/products" },
    { name: "Add Products", path: "/products/add" },
  ];

  // const profileLinks = [
  //   { name: "Signup", path: "/signup" },
  //   { name: "Login", path: "/login" },
  //   { name: "Logout", path: "/logout" }];

  let profileLinks = []

  const token = localStorage.getItem('token')
  
  if(token) {
    profileLinks = [
      { name: "Logout", path: "/logout" }
    ]
  } else {
    profileLinks = [
      { name: "Signup", path: "/signup" },
      { name: "Login", path: "/login" }
    ]
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" component={"div"} sx={{ flexGrow: 1 }}>
          eCommerce App
        </Typography>
        <Hidden mdDown>
        <Stack direction={"row"} spacing="2" p={1}>
            {navigationLinks.map((data, index) => {
              if (data.name == "Profile") {
                return (
                  <Button
                    key={index}
                    variant="text"
                    size="medium"
                    color="inherit"
                    onClick={(e) => toggleProfile(e.currentTarget)}
                    aria-controls={openProfile ? "profile-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openProfile ? "true" : undefined}
                    endIcon={
                      openProfile ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )
                    }
                  >
                    {data.name}
                  </Button>
                );
              } if (data.name == "Products" && localStorage.getItem('token')) {
                return (
                  <Button
                    key={index}
                    variant="text"
                    size="medium"
                    color="inherit"
                    onClick={(e) => toggleProducts(e.currentTarget)}
                    aria-controls={openProducts ? "profile-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openProducts ? "true" : undefined}
                    endIcon={
                      openProducts ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )
                    }
                  >
                    Products
                  </Button>
                );
              }
              else if (data.name !== "Profile" && data.name !== "Products") {
                return (
                  <Button
                    key={index}
                    variant="text"
                    size="medium"
                    color="inherit"
                  >
                    <Link
                      key={data.path}
                      style={{ textDecoration: "none", color: "white" }}
                      to={data.path}
                    >
                      {data.name}
                    </Link>
                  </Button>
                );
              }
              
            })}
          </Stack>
        </Hidden>
        <Hidden mdUp>
          <IconButton onClick={() => toggleOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Menu
          open={openProfile}
          id="profile-menu"
          anchorEl={anchorProfile}
          MenuListProps={{ "aria-labelledby": "profile-button" }}
          onClose={() => toggleProfile(null)}
        >
          {profileLinks.map(data => {
            if (data.name == "Logout") {
              return (
                <MenuItem key={'logout'} onClick={() => toggleProfile(null)}>
                    <Button variant="text" size="small" onClick={handleLogout}>{data.name}</Button>
              </MenuItem>
              )
            } else {
              return (
                <MenuItem key={data.name} onClick={() => toggleProfile(null)}>
                    <Link
                      key={data.path}
                      style={{ textDecoration: "none", color: "black" }}
                      to={data.path}
                    >
                      {data.name}
                    </Link>
              </MenuItem>
              )
            }
          })}
        </Menu>

        <Menu
          open={openProducts}
          id="profile-menu"
          anchorEl={anchorProducts}
          MenuListProps={{ "aria-labelledby": "products-button" }}
          onClose={() => toggleProducts(null)}
        >
          {productLinks.map((every, index) => {
            return (
              <MenuItem key={every.name}>
              <Link
                      key={every.path}
                      style={{ textDecoration: "none", color: "black" }}
                      to={every.path}
                    >
                      {every.name}
                    </Link>
              </MenuItem>
            )
          })}
        </Menu>
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
              if (data.name == "Profile") {
                return (
                  <Box>
                  <Button
                    key={index}
                    variant="text"
                    size="medium"
                    color="inherit"
                    onClick={(e) => toggleProfile(e.currentTarget)}
                    aria-controls={openProfile ? "profile-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openProfile ? "true" : undefined}
                    endIcon={
                      openProfile ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )
                    }
                  >
                    {data.name}
                  </Button>
                  <Divider />
                  </Box>
                );
              } if (data.name == "Products" && localStorage.getItem('token')) {
                return (
                  <Box>
                  <Button
                    key={index}
                    variant="text"
                    size="medium"
                    color="inherit"
                    onClick={(e) => toggleProducts(e.currentTarget)}
                    aria-controls={openProducts ? "profile-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openProducts ? "true" : undefined}
                    endIcon={
                      openProducts ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )
                    }
                  >
                    Products
                  </Button>
                  <Divider />
                  </Box>
                );
              }
              else if (data.name !== "Profile" && data.name !== "Products") {
                return (
                 <Box>
                  <Button
                    key={index}
                    variant="text"
                    size="medium"
                    color="inherit"
                  >
                    <Link
                      key={data.path}
                      style={{ textDecoration: "none", color: "black" }}
                      to={data.path}
                    >
                      {data.name}
                    </Link>
                  </Button>
                  <Divider />
                  </Box>  
                );
              }
              
            })}
          </Stack>
      </SwipeableDrawer>
    </AppBar>
  );
}

export default Nav;
