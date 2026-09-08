import {
    AppBar,
    Avatar,
    Box,
    Breadcrumbs,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useAuth } from "../../../contexts/AuthContext";
import {
    Link as RouterLink,
    useLocation
} from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({
    onMenuClick
}: HeaderProps) {

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

    const { mode, toggleTheme } = useTheme();

    return (

        <AppBar
            position="static"
            elevation={0}
            color="inherit"
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider"
            }}
        >

            <Toolbar>

                {/* Botão do menu somente no mobile */}
                <IconButton
                    onClick={onMenuClick}
                    sx={{
                        display: {
                            xs: "inline-flex",
                            md: "none"
                        },
                        mr: 1
                    }}
                    aria-label="Abrir menu"
                >
                    <MenuIcon />
                </IconButton>

                {/* Breadcrumb */}
                <Box
                    sx={{
                        flex: 1,
                        display: { xs: "none", sm: "block" }
                    }}
                >
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
                                    color: "text.secondary",
                                    "&:hover": {
                                        color: "primary.main"
                                    }
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

                {/* Usuário */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >

                    <IconButton
                        onClick={toggleTheme}
                        color="inherit"
                        aria-label={
                            mode === "light"
                                ? "Ativar modo escuro"
                                : "Ativar modo claro"
                        }
                    >
                        {mode === "light"
                            ? <DarkModeIcon />
                            : <LightModeIcon />
                        }
                    </IconButton>

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