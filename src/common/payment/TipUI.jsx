import { Box, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { red } from "@mui/material/colors";
import axios from "../../api/axios";
import Spinner from "../Spinner";
import ButtonUI from "../Button";

function TipUI() {
  const { username } = useParams();
  const [tipAmmount, setTipAmmount] = useState(2);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const handleChange = (event) => {
    setTipAmmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    setIsProcessingPayment(true);
    event.preventDefault();
    try {
      const res = await axios.post(`api/create-checkout-session`, {
        donor: "jimmy lobster",
        employee: username,
        amount: tipAmmount,
      });

      if (res.data.url) {
        setIsProcessingPayment(false);
        window.location.href = res.data.url; // Redirect to Stripe Checkout
      } else {
        setIsProcessingPayment(false);
        console.error("Error: Stripe session URL not received");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (isProcessingPayment)
    return <Spinner message={"loading payment page, please wait..."} />;

  return (
    <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
      <Typography variant="h4" fontWeight={600}>
        Tip {username}
      </Typography>
      <Box
        sx={{
          mt: 10,
          mx: "auto",
          gap: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">Select An Amount to Tip</Typography>
        <Box
          sx={{ display: "flex", gap: 2 }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <Box>
            <TextField
              type="number"
              variant="standard"
              label="Price"
              onChange={handleChange}
              sx={{
                width: 300,
                "& .MuiInputBase-root": {
                  borderBottom: "1px solid #ddd", // Subtle bottom border
                  "&:hover": {
                    borderBottom: "1px solid #aaa", // Slightly darker border on hover
                  },
                  "&.Mui-focused": {
                    borderBottom: "1px solid #3f51b5", // Blue border on focus
                  },
                },
              }}
            />
            {tipAmmount && (tipAmmount < 1 || tipAmmount > 50) && (
              <Typography sx={{ color: red[700] }}>
                *invalid ammount,select between 1$ to 50$
              </Typography>
            )}
          </Box>

          <ButtonUI
            variant={"contained"}
            styles={{ height: "fit-content" }}
            type="submit"
            disabled={tipAmmount < 1 || tipAmmount > 50}
          >
            Tip ${tipAmmount}
          </ButtonUI>
        </Box>
      </Box>
    </Box>
  );
}

export default TipUI;
