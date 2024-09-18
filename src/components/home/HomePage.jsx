/* eslint-disable no-unused-vars */
import {
  Container,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { Box, Card, CardContent } from "@mui/material";
// import { TextField, } from '@mui/material';
import Header from "../../common/Header";
import qr_image from "../../media/home_page_image.png";
// import girl_waitress from '../../media/girl_waitress.png'
import { makeStyles, styled } from "@mui/styles";

const useStyles = makeStyles({
  backgroundCanvas: {
    position: "absolute",
    background: "linear-gradient(135deg, #ff5858, #f09819, #7B61FF, #6A1B9A)",
    top: "0",
    left: "0",
    right: "0",
    height: "600px",
    zIndex: "0",
    clipPath: "polygon(0 0, 100% 0, 100% 60%, 0% 100%)",
  },
});

const ContactSalesButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: "#ffffff",
  backgroundColor: "#ffffff20",
  borderRadius: "20px",
  padding: theme.spacing(1, 3),
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
}));

function HomePage() {
  const companyName = "PulsePe";
  const classes = useStyles();
  return (
    <div style={{ background: "#f0f0f0" }}>
      <div className={classes.backgroundCanvas} />
      <Header companyName={companyName} />
      <Container
        maxWidth="lg"
        style={{ marginTop: "30px", position: "relative", zIndex: "1" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h2"
                component="h1"
                style={{ fontWeight: "bold", color: "white" }}
              >
                The Easy Way to Show Your Appreciation!
              </Typography>
              <Typography
                variant="body1"
                style={{ marginTop: "20px", color: "white" }}
              >
                Join the thousands of service professionals who trust{" "}
                {companyName} to receive tips effortlessly and securely.
                Streamline your earnings, offer a modern tipping experience, and
                increase your income—whether you're working directly with
                clients or providing exceptional service
              </Typography>
              <Box mt={3}>
                <ContactSalesButton>Contact sales</ContactSalesButton>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <img src={qr_image} width={"100%"} />
          </Grid>
        </Grid>
        <Box mt={5}>
          <Statistics />
        </Box>
      </Container>
      <Banner />
    </div>
  );
}

const Banner = () => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100vw",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          animation: "scroll-left 20s linear infinite", // Infinite scrolling animation
          whiteSpace: "nowrap",
        }}
      >
        {/* First Set of Elements */}
        {Array(2).fill(
          <>
            {/* Square with image and text */}
            <Box sx={{ textAlign: "center", marginRight: "50px" }}>
              <Box
                component="img"
                src="https://via.placeholder.com/150"
                alt="square"
                sx={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  backgroundColor: "#ccc",
                  borderRadius: "8px",
                }}
              />
              <Typography variant="body1" sx={{ marginTop: "10px" }}>
                Square Image
              </Typography>
            </Box>

            {/* Triangle with image and text */}
            <Box sx={{ textAlign: "center", marginRight: "50px" }}>
              <Box
                sx={{
                  width: "0",
                  height: "0",
                  borderLeft: "75px solid transparent",
                  borderRight: "75px solid transparent",
                  borderBottom: "150px solid #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src="https://via.placeholder.com/150"
                  alt="triangle"
                  sx={{
                    position: "absolute",
                    top: "0",
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                  }}
                />
              </Box>
              <Typography variant="body1" sx={{ marginTop: "10px" }}>
                Triangle Image
              </Typography>
            </Box>

            {/* Circle with image and text */}
            <Box sx={{ textAlign: "center", marginRight: "50px" }}>
              <Box
                component="img"
                src="https://via.placeholder.com/150"
                alt="circle"
                sx={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  backgroundColor: "#ccc",
                }}
              />
              <Typography variant="body1" sx={{ marginTop: "10px" }}>
                Circle Image
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {/* CSS Keyframes */}
      <style>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
    </Box>
  );
};

const Statistics = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Net volume from sales</Typography>
            <Typography variant="h4">$39,274.29</Typography>
            <Typography variant="body2">+32.8% from yesterday</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">New customers</Typography>
            <Typography variant="h4">37</Typography>
            <Typography variant="body2">+32.1% from yesterday</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total revenue today</Typography>
            <Typography variant="h4">$3,528,198.72</Typography>
            <Typography variant="body2">+32.8% from yesterday</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomePage;
