import { Box, Typography } from "@mui/material";
import { FaShop } from "react-icons/fa6";
import Logo from "../common/Logo";
import ButtonUI from "../common/Button";
import { RiMenu2Line } from "react-icons/ri";

function Header({ setNavOpen }) {
  return (
    <Box
      component={"header"}
      sx={{
        color: (theme) => theme.palette.primary.light,
        height: "4rem",
        zIndex: 10,
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <ButtonUI
            disableRipple={true}
            disableElevation={true}
            styles={{ color: "primary.light", fontSize: "2rem" }}
            onClick={() => setNavOpen((open) => !open)}
          >
            <RiMenu2Line />
          </ButtonUI>
          <Logo />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography>Spicy Food, Dublin</Typography>
          <Box
            component={FaShop}
            sx={{ fontSize: "xx-large" }} // Use sx for icon styling
          />
          {/* <FaShop style={{ fontSize: 'xx-large' }} /> */}
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
