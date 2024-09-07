import { Box } from "@mui/material";

function Main({ children }) {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        flexGrow: 1,
        height: "calc(100vh - 4rem)",
        overflow: "auto",
        position: "relative",
        borderRadius: "2rem 2rem 0 0",
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
