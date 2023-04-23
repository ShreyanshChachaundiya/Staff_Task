import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({}));

function Navbar(props) {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ width: "100%" }}>
        <Toolbar
          sx={{ justifyContent: "space-between", backgroundColor: "#ffff" }}
        >
          <Typography variant="h6" component="div" sx={{ color: "#000000" }}>
            Manage Staff
          </Typography>
          <Button
            color="inherit"
            sx={{ backgroundColor: "#1602FF", color: "#FFFFFF", px:3 }}
            onClick={()=>{props.openModel()}}
          >
            Add Staff
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
