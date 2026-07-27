import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export function Login() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f7fb"
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: 420,
                    padding: 5,
                    borderRadius: 3
                }}
            >
                <Stack spacing={3}>

                    <Box>

                        <Typography
                            variant="h4"
                            align="center"
                        >
                            CoreFlow
                        </Typography>

                        <Typography
                            align="center"
                            color="text.secondary"
                        >
                            Enterprise Management System
                        </Typography>

                    </Box>

                    <TextField
                        fullWidth
                        label="E-mail"
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="Senha"
                    />

                    <Button
                        variant="contained"
                        size="large"
                    >
                        Entrar
                    </Button>

                </Stack>

            </Paper>

        </Box>
    );
}