import { Box } from "@mui/material"
import { Link } from "react-router-dom"

function Dashboard() {
  return (
    <Box component={"section"}>
<Link to={"/employees"}>go to employees page</Link>
    </Box>
  )
}

export default Dashboard