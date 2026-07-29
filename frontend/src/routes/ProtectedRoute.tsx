import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { UserRole } from "../types/auth";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles?: UserRole[];
}

export function ProtectedRoute({
    children,
    roles
}: ProtectedRouteProps) {

    const { signed, user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        if (
            signed &&
            roles &&
            user &&
            !roles.includes(user.role)
        ) {

            enqueueSnackbar(
                "Você não possui permissão para acessar esta página.",
                {
                    variant: "warning"
                }
            );

        }

    }, [
        signed,
        user,
        roles,
        enqueueSnackbar
    ]);

    if (!signed) {
        return <Navigate to="/" replace />;
    }

    if (
        roles &&
        user &&
        !roles.includes(user.role)
    ) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}