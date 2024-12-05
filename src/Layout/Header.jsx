import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "unActive")}
            to={"main-page"}
          >
            <Button color="inherit" type="submit">
              Login
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
