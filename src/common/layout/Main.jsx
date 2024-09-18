import { Box } from "@mui/material";

function Main({ children }) {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        flexGrow: 1,
        overflow: "auto",
        height:"auto",
        position: "relative",
        padding: {
          xs: "0.5rem", 
          sm: "1rem", 
          md: "2rem",  
          lg: "2rem",  
        },
      }}
    >
      {children}
    </Box>
  );
}

export default Main;
