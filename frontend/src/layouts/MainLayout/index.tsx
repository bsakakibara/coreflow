import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";

export function MainLayout() {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "#f5f7fb"
            }}
        >
            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Header />

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        p: 4
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}