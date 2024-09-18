/* eslint-disable react/prop-types */
import { List, ListItem } from "@mui/material";
import EmployeeCard from "./EmployeeCard";

function EmployeesList({ employees }) {
  return (
    <List
      sx={{
        p:{xs:"0.5rem", sm:"2rem", md:"2rem"},
        display: "flex",
        width: "100%",
        flexDirection: "row", 
        justifyContent: "center",
        alignItems: "center",
        gap:1,
        height: "auto",
        flexWrap:"wrap",
      }}
    >
      {employees?.map((employee) => (
        <ListItem key={employee?.empId}  sx={{
          width: {
            xs: '80%', 
            sm:"48%", 
            md: '23%',
          },
        }}>
          <EmployeeCard employeeData={employee} />
        </ListItem>
      ))}
    </List>
  );
}

export default EmployeesList;
