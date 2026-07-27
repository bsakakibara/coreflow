import {
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssessmentIcon from "@mui/icons-material/Assessment";

import { NavLink, useLocation } from "react-router-dom";

interface MenuItem {
    title: string;
    path: string;
    icon: React.ReactNode;
}

export function Sidebar() {

    const location = useLocation();

    const menus: MenuItem[] = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <DashboardIcon />
        },
        {
            title: "Usuários",
            path: "/users",
            icon: <PeopleIcon />
        },
        {
            title: "Clientes",
            path: "/clients",
            icon: <BusinessIcon />
        },
        {
            title: "Produtos",
            path: "/products",
            icon: <Inventory2Icon />
        },
        {
            title: "Pedidos",
            path: "/orders",
            icon: <ShoppingCartIcon />
        },
        {
            title: "Relatórios",
            path: "/reports",
            icon: <AssessmentIcon />
        }
    ];

    return (
        <Box
            sx={{
                width: 260,
                minWidth: 260,
                backgroundColor: "#0f172a",
                color: "#fff",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Box
                sx={{
                    p: 3,
                    textAlign: "center"
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold" }}
                >
                    CoreFlow
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#94a3b8"
                    }}
                >
                    Enterprise System
                </Typography>
            </Box>

            <Divider
                sx={{
                    borderColor: "#1e293b"
                }}
            />

            <List sx={{ mt: 2 }}>

                {menus.map((menu) => (

                    <ListItemButton
                        key={menu.path}
                        component={NavLink}
                        to={menu.path}
                        selected={location.pathname === menu.path}
                        sx={{
                            mx: 1,
                            mb: 1,
                            borderRadius: 2,

                            "&.Mui-selected": {
                                backgroundColor: "#2563eb"
                            },

                            "&.Mui-selected:hover": {
                                backgroundColor: "#1d4ed8"
                            },

                            "&:hover": {
                                backgroundColor: "#1e293b"
                            }
                        }}
                    >

                        <ListItemIcon
                            sx={{
                                color: "inherit",
                                minWidth: 40
                            }}
                        >
                            {menu.icon}
                        </ListItemIcon>

                        <ListItemText primary={menu.title} />

                    </ListItemButton>

                ))}

            </List>

        </Box>
    );
}