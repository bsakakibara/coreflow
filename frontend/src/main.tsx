import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/400.css";

import "./styles/global.css";

import App from "./App";
import { theme } from "./theme/theme";
import { AuthProvider } from "./contexts/AuthContext";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <ThemeProvider theme={theme}>

      <CssBaseline />

      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >

        <AuthProvider>

          <App />

        </AuthProvider>

      </SnackbarProvider>

    </ThemeProvider>

  </React.StrictMode>
);