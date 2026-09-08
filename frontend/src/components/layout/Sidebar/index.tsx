import {
    Box,
    Divider,
    Drawer,
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
import { useAuth } from "../../../contexts/AuthContext";

interface MenuItem {
    title: string;
    path: string;
    icon: React.ReactNode;
    roles?: string[];
}

interface SidebarProps {
    mobileOpen: boolean;
    onMobileClose: () => void;
}

export function Sidebar({
    mobileOpen,
    onMobileClose
}: SidebarProps) {

    const location = useLocation();
    const { user } = useAuth();

    const menus: MenuItem[] = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <DashboardIcon />
        },
        {
            title: "Usuários",
            path: "/users",
            icon: <PeopleIcon />,
            roles: ["ADMIN"]
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

    const visibleMenus = menus.filter(
        (menu) =>
            !menu.roles ||
            (user && menu.roles.includes(user.role))
    );

    const sidebarContent = (

        <Box
            sx={{
                width: 260,
                height: "100%",
                backgroundColor: "background.paper",
                color: "text.primary",
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
                    sx={{
                        fontWeight: "bold"
                    }}
                >
                    CoreFlow
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Enterprise System
                </Typography>

            </Box>

            <Divider />

            <List sx={{ mt: 2 }}>

                {visibleMenus.map((menu) => (

                    <ListItemButton
                        key={menu.path}
                        component={NavLink}
                        to={menu.path}
                        selected={
                            location.pathname === menu.path
                        }
                        onClick={onMobileClose}
                        sx={{
                            mx: 1,
                            mb: 1,
                            borderRadius: 2,

                            "&.Mui-selected": {
                                backgroundColor: "primary.main",
                                color: "#fff"
                            },

                            "&.Mui-selected:hover": {
                                backgroundColor: "primary.dark"
                            },

                            "&:hover": {
                                backgroundColor:
                                    "action.hover"
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

                        <ListItemText
                            primary={menu.title}
                        />

                    </ListItemButton>

                ))}

            </List>

        </Box>

    );

    return (
        <>
            {/* Desktop */}
            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "block"
                    }
                }}
            >
                {sidebarContent}
            </Box>

            {/* Mobile */}
            <Drawer
                open={mobileOpen}
                onClose={onMobileClose}
                sx={{
                    display: {
                        xs: "block",
                        md: "none"
                    },

                    "& .MuiDrawer-paper": {
                        width: 260,
                        backgroundColor: "background.paper",
                        color: "text.primary"
                    }
                }}
            >
                {sidebarContent}
            </Drawer>
        </>
    );
}