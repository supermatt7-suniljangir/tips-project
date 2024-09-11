import { useEffect, useState } from "react";
import EmployeesList from "./EmployeesList";
import { Box, Typography } from "@mui/material";
import { getEmployees } from "../../services/employees/api";
import Spinner from "../../common/Spinner";


function EmployeeUi() {

  const [data, setData] = useState();
const [loading, setLoading]  = useState(true);
  useEffect(() => {
    const getData = async function () {
      const data = await getEmployees();
      if(data && data.length > 0) setLoading(false)
      setData(data);
    };
    getData();
  }, []);

if(loading) return <Spinner/>

  return <Box sx={{height:"inherit"}}>
    <Typography variant="h4">Select an employee to Tip</Typography>
    <EmployeesList employees={data}/></Box>;
}

export default EmployeeUi;
