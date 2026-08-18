import { Grid } from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { DashboardCard } from "../DashboardCard";

import type { Dashboard } from "../../../types/dashboard";
import { useAuth } from "../../../contexts/AuthContext";

interface DashboardCardsProps {
    dashboard: Dashboard;
}

export function DashboardCards({
    dashboard
}: DashboardCardsProps) {

    const { user } = useAuth();

    return (

        <Grid
            container
            spacing={3}
        >

            {user?.role === "ADMIN" && (

                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

                    <DashboardCard
                        title="Usuários"
                        value={dashboard.users}
                        color="#2563eb"
                        icon={<PeopleIcon />}
                    />

                </Grid>

            )}

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

                <DashboardCard
                    title="Clientes"
                    value={dashboard.clients}
                    color="#22c55e"
                    icon={<BusinessIcon />}
                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

                <DashboardCard
                    title="Produtos"
                    value={dashboard.products}
                    color="#f59e0b"
                    icon={<Inventory2Icon />}
                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

                <DashboardCard
                    title="Pedidos"
                    value={dashboard.orders}
                    color="#ef4444"
                    icon={<ShoppingCartIcon />}
                />

            </Grid>

        </Grid>

    );
}