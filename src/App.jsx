// /* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import Inventory from "./pages/Inventory";
import AppLayout from "./UI/layout/AppLayout";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Tip from "./pages/Tip";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import HomePage from "./pages/HomePage";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#212121",
        dark: "#424242",
        light: "#fff",
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
