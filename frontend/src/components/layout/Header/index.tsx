import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../../../contexts/AuthContext";

export function Header() {

    const { user, logout } = useAuth();

    function handleLogout() {

        logout();

    }

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

                <Typography
                    variant="h6"
                    sx={{
                        flex: 1,
                        fontWeight: 700
                    }}
                >
                    Dashboard
                </Typography>

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