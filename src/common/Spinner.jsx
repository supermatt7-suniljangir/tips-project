import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {  Typography } from '@mui/material';

function Spinner({message}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:"column",
        pb:8,
        gap:2,
        height: "calc(100vh - 4rem)", // Adjust height as needed
      }}
    >
      <CircularProgress />
     <Typography sx={{fontSize:"1.6rem", textTransform:"capitalize"}}>{message}</Typography>
    </Box>
  );
}

export default Spinner;
