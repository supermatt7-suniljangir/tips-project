import { Box } from "@mui/material"
import { Link } from "react-router-dom"
function Logo() {



  return (
<Link to="/">
<Box
      component="img"
      src="/logo.png"
      alt="Logo"
      sx={{ width: '2rem', aspectRatio:1, borderRadius: "50%"}}
    />
</Link>
  )
}

export default Logo