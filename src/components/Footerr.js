import { Toolbar, Typography, BottomNavigation } from "@mui/material";
import { display } from "@mui/system";
import React from "react";

function Footerr() {
  return (
    <BottomNavigation sx={{color:'white', backgroundColor: '#1976d2', width: '100%', position: 'fixed', bottom: 0}}>
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" component={"div"} textAlign="center">
          E-Com Dashboard{" "}
        </Typography>
        <Typography variant="subtitle1" component={"div"} paddingLeft>
          © All Rights Reserved
        </Typography>
      </Toolbar>
    </BottomNavigation>
  );
}

export default Footerr;
