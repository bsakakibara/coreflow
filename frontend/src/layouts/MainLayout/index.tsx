import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";

export function MainLayout() {

    const [mobileOpen, setMobileOpen] = useState(false);

    function handleMenuToggle() {
        setMobileOpen((prev) => !prev);
    }

    function handleMenuClose() {
        setMobileOpen(false);
    }

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "background.default"
            }}
        >

            <Sidebar
                mobileOpen={mobileOpen}
                onMobileClose={handleMenuClose}
            />

            <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                <Header
                    onMenuClick={handleMenuToggle}
                />

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        p: {
                            xs: 2,
                            sm: 3,
                            md: 4
                        }
                    }}
                >
                    <Outlet />
                </Box>

            </Box>

        </Box>
    );
}