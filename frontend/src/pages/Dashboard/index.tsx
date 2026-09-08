import {
    Grid,
    Box,
    Typography
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

import { DashboardCards } from "../../components/dashboard/DashboardCards";
import { DashboardChart } from "../../components/dashboard/DashboardChart";
import { DashboardStatusChart } from "../../components/dashboard/DashboardStatusChart";

import { PageHeader } from "../../components/common/PageHeader";

import { useDashboard } from "../../hooks/useDashboard";

export function Dashboard() {

    const {
        dashboard,
        loading
    } = useDashboard();

    return (
        <>
            <PageHeader
                title="Dashboard"
                subtitle="Acompanhe os principais indicadores do sistema."
            />

            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 300
                    }}
                >
                    <CircularProgress />
                </Box>
            )}

            {!loading && dashboard && (
                <Box>

                    <DashboardCards
                        dashboard={dashboard}
                    />

                    <Grid
                        container
                        spacing={3}
                        sx={{ mt: 3 }}
                    >

                        <Grid
                            size={{
                                xs: 12,
                                lg: 8
                            }}
                        >
                            <DashboardChart
                                data={dashboard.chart}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                lg: 4
                            }}
                        >
                            <DashboardStatusChart
                                data={dashboard.ordersByStatus}
                            />
                        </Grid>

                    </Grid>

                    <Grid
                        container
                        spacing={3}
                        sx={{ mt: 0 }}
                    >

                        <Grid
                            size={{
                                xs: 12
                            }}
                        >
                            <Box
                                sx={{
                                    mt: 1,
                                    p: 2.5,
                                    borderRadius: 3,
                                    border: "1px solid",
                                    borderColor: "divider"
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Faturamento neste mês
                                </Typography>

                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 700, mt: 0.5 }}
                                >
                                    {
                                        dashboard.currentMonthSales.toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL"
                                            }
                                        )
                                    }
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                >
                                    {dashboard.currentMonthOrders} pedidos realizados neste mês
                                </Typography>
                            </Box>
                        </Grid>

                    </Grid>

                </Box >
            )
            }
        </>
    );
}