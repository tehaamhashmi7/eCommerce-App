import { AppBar, Toolbar, Typography } from "@mui/material";
import { display } from "@mui/system";
import React from "react";

function Footerr() {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" component={"div"} textAlign="center">
          E-Com Dashboard{" "}
        </Typography>
        <Typography variant="subtitle1" component={"div"} paddingLeft>
          © All Rights Reserved
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footerr;
