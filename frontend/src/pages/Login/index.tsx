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
    CircularProgress
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
                elevation={5}
                sx={{
                    width: 420,
                    padding: 5,
                    borderRadius: 3
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

                    </Stack>

                </form>

            </Paper>

        </Box>

    );

}