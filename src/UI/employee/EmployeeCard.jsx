import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonUI from "../../common/Button";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function EmployeeCard({ employeeData }) {
  return (
    <Card sx={{ width: "100%", p: { sm: "0.5rem", md: "1rem" } }} elevation={6}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "cover",
            mb: 1.5,
          }}
          component={"img"}
          src="https://via.placeholder.com/200"
          alt="profile picture"
        />
        <Typography variant="h5" sx={{ mb: 1.5, textAlign: "center" }}>
          {employeeData.username}
        </Typography>
        <Typography variant="body2">{employeeData.email}</Typography>
        <Typography variant="body2">{employeeData.phoneNo}</Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`/employees/tip/${employeeData.username}`}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <ButtonUI
            styles={{
              color: "primary.light",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
            disableRipple={true}
            size={"small"}
            variant={"contained"}
          >
            Tip
          </ButtonUI>
        </Link>
      </CardActions>
    </Card>
  );
}

export default EmployeeCard;
