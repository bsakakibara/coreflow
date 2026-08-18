import {
    AppBar,
    Avatar,
    Box,
    Breadcrumbs,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../../../contexts/AuthContext";
import {
    Link as RouterLink,
    useLocation
} from "react-router-dom";

export function Header() {

    const { user, logout } = useAuth();
    const location = useLocation();

    function handleLogout() {
        logout();
    }

    const pageTitles: Record<string, string> = {
        "/dashboard": "Dashboard",
        "/users": "Usuários",
        "/clients": "Clientes",
        "/products": "Produtos",
        "/orders": "Pedidos",
        "/reports": "Relatórios"
    };

    const pageTitle =
        pageTitles[location.pathname] ?? "CoreFlow";

    return (

        <AppBar
            position="static"
            elevation={0}
            color="inherit"
            sx={{
                borderBottom: "1px solid #e5e7eb"
            }}
        >

            <Toolbar>

                <Box sx={{ flex: 1 }}>
                    <Breadcrumbs aria-label="breadcrumb">

                        <RouterLink
                            to="/dashboard"
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: "text.secondary"
                                }}
                            >
                                CoreFlow
                            </Typography>
                        </RouterLink>

                        <Typography
                            color="text.primary"
                            sx={{
                                fontSize: 14,
                                fontWeight: 700
                            }}
                        >
                            {pageTitle}
                        </Typography>

                    </Breadcrumbs>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >

                    <Box
                        sx={{
                            textAlign: "right"
                        }}
                    >

                        <Typography
                            sx={{ fontWeight: "bold" }}
                        >
                            {user?.name}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {user?.role}
                        </Typography>

                    </Box>

                    <Avatar>

                        {user?.name?.charAt(0).toUpperCase()}

                    </Avatar>

                    <IconButton
                        color="error"
                        onClick={handleLogout}
                    >

                        <LogoutIcon />

                    </IconButton>

                </Box>

            </Toolbar>

        </AppBar>

    );

}