import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    Tooltip
} from "recharts";

const data = [
    { month: "Jan", total: 120 },
    { month: "Fev", total: 240 },
    { month: "Mar", total: 180 },
    { month: "Abr", total: 320 },
    { month: "Mai", total: 290 },
    { month: "Jun", total: 420 }
];

export function DashboardChart() {

    return (

        <Card
            elevation={0}
            sx={{
                mt: 4,
                borderRadius: 3,
                border: "1px solid #e5e7eb"
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    sx={{ mb: 3 }}
                >
                    Vendas dos últimos meses
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <LineChart data={data}>

                        <XAxis dataKey="month" />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#2563eb"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}