import { Box } from "@mui/material";

function NavBar() {
  return (
    <Box
      component={"nav"}
      sx={{ position: "fixed", inset: "4rem auto auto 0", width: "12rem", height:"100vh", backgroundColor:"primary.main", zIndex:1 }}
    ></Box>
  );
}

export default NavBar;
