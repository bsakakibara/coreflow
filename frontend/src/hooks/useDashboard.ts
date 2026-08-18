import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

import { dashboardService } from "../services/dashboard.service";
import type { Dashboard } from "../types/dashboard";

export function useDashboard() {

    const { enqueueSnackbar } = useSnackbar();

    const [dashboard, setDashboard] =
        useState<Dashboard | null>(null);

    const [loading, setLoading] =
        useState(true);

    const loadDashboard = useCallback(async () => {

        try {

            setLoading(true);

            const data =
                await dashboardService.getDashboard();

            setDashboard(data);

        } catch (error) {

            if (axios.isAxiosError(error)) {

                enqueueSnackbar(
                    error.response?.data?.message ??
                    "Erro ao carregar o dashboard.",
                    {
                        variant: "error"
                    }
                );

            } else {

                enqueueSnackbar(
                    "Erro inesperado ao carregar o dashboard.",
                    {
                        variant: "error"
                    }
                );

            }

        } finally {

            setLoading(false);

        }

    }, [enqueueSnackbar]);

    useEffect(() => {

        loadDashboard();

    }, [loadDashboard]);

    return {
        dashboard,
        loading,
        loadDashboard
    };
}