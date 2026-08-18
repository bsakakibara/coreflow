import { useCallback, useEffect, useState } from "react";

import axios from "axios";

import { useSnackbar } from "notistack";

import { reportsService } from "../services/reports.service";

import type { Reports } from "../types/reports";

export function useReports() {

    const { enqueueSnackbar } = useSnackbar();

    const [reports, setReports] =
        useState<Reports | null>(null);

    const [loading, setLoading] =
        useState(true);

    const loadReports = useCallback(async () => {

        try {

            setLoading(true);

            const data =
                await reportsService.getReports();

            setReports(data);

        } catch (error) {

            if (axios.isAxiosError(error)) {

                enqueueSnackbar(
                    error.response?.data?.message ??
                    "Erro ao carregar os relatórios.",
                    {
                        variant: "error"
                    }
                );

            } else {

                enqueueSnackbar(
                    "Erro inesperado ao carregar os relatórios.",
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

        loadReports();

    }, [loadReports]);

    return {
        reports,
        loading,
        loadReports
    };
}