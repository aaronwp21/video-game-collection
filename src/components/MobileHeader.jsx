import React from 'react';
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function MobileHeader({drawToggle, handleDrawerToggle, drawerWidth=240}) {
  return (
    <>
      <Box component="nav">
      <Drawer
        variant="temporary"
        open={drawToggle}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2, cursor: 'default' }}>
            Games Collection
          </Typography>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton
                sx={{ textAlign: "left" }}
                component={NavLink}
                to="/"
              >
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                sx={{ textAlign: "left" }}
                component={NavLink}
                to="/add"
              >
                <ListItemText primary={"Add Game"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
    </>
  )
}

export default MobileHeader;
