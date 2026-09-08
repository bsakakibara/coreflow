import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ThemeMode } from "../theme/theme";

interface ThemeContextData {
    mode: ThemeMode;
    toggleTheme: () => void;
}

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeContext =
    createContext<ThemeContextData | undefined>(undefined);

export function ThemeProvider({
    children
}: ThemeProviderProps) {

    const [mode, setMode] = useState<ThemeMode>(() => {

        const savedMode =
            localStorage.getItem("coreflow-theme");

        if (
            savedMode === "dark" ||
            savedMode === "light"
        ) {
            return savedMode;
        }

        return "light";
    });

    const toggleTheme = () => {

        setMode((currentMode) => {

            const newMode =
                currentMode === "light"
                    ? "dark"
                    : "light";

            localStorage.setItem(
                "coreflow-theme",
                newMode
            );

            return newMode;
        });

    };

    return (
        <ThemeContext.Provider
            value={{
                mode,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {

    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme deve ser utilizado dentro de ThemeProvider."
        );
    }

    return context;
}