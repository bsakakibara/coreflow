import { Grid } from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { DashboardCard } from "../DashboardCard";

export function DashboardCards() {

    return (

        <Grid
            container
            spacing={3}
        >

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>

                <DashboardCard
                    title="Usuários"
                    value={126}
                    color="#2563eb"
                    icon={<PeopleIcon />}
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>

                <DashboardCard
                    title="Clientes"
                    value={845}
                    color="#22c55e"
                    icon={<BusinessIcon />}
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>

                <DashboardCard
                    title="Produtos"
                    value={582}
                    color="#f59e0b"
                    icon={<Inventory2Icon />}
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>

                <DashboardCard
                    title="Pedidos"
                    value={42}
                    color="#ef4444"
                    icon={<ShoppingCartIcon />}
                />

            </Grid>

        </Grid>

    );

}