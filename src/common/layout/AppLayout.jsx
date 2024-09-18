import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Main from "./Main";
// import { useState } from "react";
// import Header from "./Header";
import Navbar from "./NavBar";
import Footer from "./Footer";
function AppLayout() {
  // const [navOpen, setNavOpen] = useState(false);
  return (
    <Box
      sx={{
        backgroundColor: (theme)=> theme.palette.primary.light,
        height: "auto",
        position: "relative",
      }}
    >
      {/* hamburger button is defined in the Header */}
      {/* <Header setNavOpen={setNavOpen} /> */}

      {/* the button will trigger the navbar to expend or shrink */}
      <Navbar/>
      <Main>
        <Outlet />
      </Main>

     
      <Footer/>

    </Box>
  );
}

export default AppLayout;
