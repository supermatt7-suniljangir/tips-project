import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Main from "./Main";
import { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
function AppLayout() {
 const [navOpen, setNavOpen] = useState(false);
  return (
    <Box sx={{backgroundColor:"primary.main", height:"100vh", overflow:"hidden", position:"relative"}}>
    {/* hamburger button is defined in the Header */}
     <Header setNavOpen={setNavOpen}/>

     {/* the button will trigger the navbar to expend or shrink */}
{navOpen && <NavBar/>}
     <Main>
      <Outlet/>
     </Main>
    </Box>
  );
}

export default AppLayout;