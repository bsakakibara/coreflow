import { createTheme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

export function createAppTheme(mode: ThemeMode) {
    const isDark = mode === "dark";

    return createTheme({
        palette: {
            mode,

            primary: {
                main: "#2563eb",
            },

            secondary: {
                main: isDark ? "#94a3b8" : "#0f172a",
            },

            background: {
                default: isDark ? "#0f172a" : "#f5f7fb",
                paper: isDark ? "#1e293b" : "#ffffff",
            },

            text: {
                primary: isDark ? "#f8fafc" : "#0f172a",
                secondary: isDark ? "#cbd5e1" : "#64748b",
            },

            success: {
                main: "#22c55e",
            },

            error: {
                main: "#ef4444",
            },

            divider: isDark ? "#334155" : "#e5e7eb",
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
}