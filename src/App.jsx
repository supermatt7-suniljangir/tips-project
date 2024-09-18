// /* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import Inventory from "./pages/Inventory";
import AppLayout from "./common/layout/AppLayout";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Tip from "./pages/Tip";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
import PaymentFailed from "./pages/PaymentFailed";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#179035",
        hover: "#087724",
        dark: "#424242",
        light: "#fff",
      },
      text: {
        dark: "#060606",
        light: "#f6f2f2",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" index element={<HomePage />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<PaymentFailed />} />
            <Route path="/employees/tip/:username" element={<Tip />} />
            <Route path="/inventory" element={<Inventory />} />
          </Route>
          <Route
            path="/login"
            element={
              <GoogleOAuthProvider clientId="298361459600-adoccuoah873sb6piqn4h1fr0o4oic69.apps.googleusercontent.com">
                <Login />
              </GoogleOAuthProvider>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
