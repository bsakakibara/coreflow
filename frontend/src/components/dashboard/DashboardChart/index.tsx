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
    YAxis,
    CartesianGrid
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
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "100%"
            }}
        >
            <CardContent>

                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600 }}
                >
                    Vendas por período
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Evolução do faturamento
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >
                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 10,
                            bottom: 10
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="rgba(128,128,128,0.2)"
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            width={70}
                            tickFormatter={(value) =>
                                `R$ ${Number(value).toLocaleString(
                                    "pt-BR"
                                )}`
                            }
                        />

                        <Tooltip
                            formatter={(value) => [
                                Number(value).toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL"
                                    }
                                ),
                                "Vendas"
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{
                                r: 5
                            }}
                            activeDot={{
                                r: 7
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>

            </CardContent>
        </Card>
    );
}