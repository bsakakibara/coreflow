import { DashboardCards } from "../../components/dashboard/DashboardCards";
import { DashboardChart } from "../../components/dashboard/DashboardChart";
import { PageHeader } from "../../components/common/PageHeader";

export function Dashboard() {

    return (

        <>
            <PageHeader
                title="Dashboard"
                subtitle="Acompanhe os principais indicadores do sistema."
            />

            <DashboardCards />

            <DashboardChart />

        </>

    );

}