import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#2563eb",
        },
        secondary: {
            main: "#0f172a",
        },
        background: {
            default: "#f5f7fb",
            paper: "#ffffff",
        },
        success: {
            main: "#22c55e",
        },
        error: {
            main: "#ef4444",
        },
    },

    typography: {
        fontFamily: "Roboto, sans-serif",

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 600,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 10,
    },
});