import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
    Alert,
    CircularProgress,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginSchema } from "../../schemas/login.schema";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../contexts/AuthContext";

export function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();


    const [error, setError] = useState("");

    const [forgotOpen, setForgotOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotMessage, setForgotMessage] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    async function onSubmit(data: LoginSchema) {

        try {

            setError("");

            const response = await authService.login(data);

            login(response.token, response.user);

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            setError("Email ou senha inválidos.");

        }

    }

    async function handleForgotPassword() {

        if (!forgotEmail.trim()) {
            setForgotMessage("Informe seu e-mail.");
            return;
        }

        try {

            setForgotLoading(true);
            setForgotMessage("");

            await authService.forgotPassword(forgotEmail.trim());

            setForgotMessage(
                "Se o e-mail estiver cadastrado, enviaremos instruções para recuperação de senha."
            );

        } catch (error) {

            console.error(error);
            setForgotMessage(
                "Não foi possível solicitar a recuperação de senha."
            );

        } finally {

            setForgotLoading(false);

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

                <form onSubmit={handleSubmit(onSubmit)}>

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

                        {error && (
                            <Alert severity="error">
                                {error}
                            </Alert>
                        )}

                        <TextField
                            label="E-mail"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...register("email")}
                        />

                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            {...register("password")}
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
                                "Entrar"
                            )}

                        </Button>

                        <Button
                            type="button"
                            variant="text"
                            onClick={() => {
                                setForgotEmail("");
                                setForgotMessage("");
                                setForgotOpen(true);
                            }}
                        >
                            Esqueceu sua senha?
                        </Button>

                    </Stack>

                </form>

            </Paper>

            <Dialog
                open={forgotOpen}
                onClose={() => setForgotOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    Recuperar senha
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>

                        <Typography color="text.secondary">
                            Informe seu e-mail para receber o link de recuperação.
                        </Typography>

                        <TextField
                            label="E-mail"
                            type="email"
                            fullWidth
                            value={forgotEmail}
                            onChange={(event) => setForgotEmail(event.target.value)}
                        />

                        {forgotMessage && (
                            <Alert severity="info">
                                {forgotMessage}
                            </Alert>
                        )}

                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setForgotOpen(false)}
                        disabled={forgotLoading}
                    >
                        Fechar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleForgotPassword}
                        disabled={forgotLoading}
                    >
                        {forgotLoading ? (
                            <CircularProgress
                                size={20}
                                color="inherit"
                            />
                        ) : (
                            "Enviar"
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>

    );

}