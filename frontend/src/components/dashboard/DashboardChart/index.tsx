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
    Tooltip,
    YAxis
} from "recharts";

import type { DashboardChartItem } from "../../../types/dashboard";

interface DashboardChartProps {
    data: DashboardChartItem[];
}

export function DashboardChart({
    data
}: DashboardChartProps) {

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

                        <XAxis
                            dataKey="month"
                        />

                        <YAxis />

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