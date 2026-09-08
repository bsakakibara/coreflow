import React from "react";
import ReactDOM from "react-dom/client";

import {
  ThemeProvider as MuiThemeProvider
} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/400.css";

import "./styles/global.css";

import App from "./App";

import { createAppTheme } from "./theme/theme";

import {
  ThemeProvider,
  useTheme
} from "./contexts/ThemeContext";

import { AuthProvider } from "./contexts/AuthContext";

import { SnackbarProvider } from "notistack";

function AppTheme() {

  const { mode } = useTheme();

  const theme = createAppTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>

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

    </MuiThemeProvider>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <ThemeProvider>

      <AppTheme />

    </ThemeProvider>

  </React.StrictMode>
);