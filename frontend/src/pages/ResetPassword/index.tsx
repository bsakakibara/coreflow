import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { authService } from "../../services/auth.service";

export function ResetPassword() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        setError("");

        if (!token) {
            setError("Token de recuperação inválido.");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve possuir pelo menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        setIsSubmitting(true);

        try {

            await authService.resetPassword(token, password);

            navigate("/");

        } catch (error) {

            console.error(error);
            setError(
                "Token inválido, expirado ou não foi possível redefinir a senha."
            );

        } finally {

            setIsSubmitting(false);

        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "background.default"
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    width: 420,
                    padding: 5,
                    borderRadius: 3,
                    backgroundColor: "background.default"
                }}
            >
                <form onSubmit={handleSubmit}>

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
                                Redefinir senha
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error">
                                {error}
                            </Alert>
                        )}

                        <TextField
                            label="Nova senha"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <TextField
                            label="Confirmar nova senha"
                            type="password"
                            fullWidth
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <CircularProgress
                                    size={22}
                                    color="inherit"
                                />
                            ) : (
                                "Redefinir senha"
                            )}
                        </Button>

                        <Button
                            type="button"
                            variant="text"
                            onClick={() => navigate("/")}
                        >
                            Voltar para o login
                        </Button>

                    </Stack>

                </form>
            </Paper>
        </Box>
    );
}