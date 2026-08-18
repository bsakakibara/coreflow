import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { DashboardCards } from "../../components/dashboard/DashboardCards";
import { DashboardChart } from "../../components/dashboard/DashboardChart";
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

                <>

                    <DashboardCards
                        dashboard={dashboard}
                    />

                    <DashboardChart
                        data={dashboard.chart}
                    />

                </>

            )}

        </>

    );
}