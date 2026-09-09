import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

import type { DashboardStatusItem } from "../../../types/dashboard";

interface DashboardStatusChartProps {
    data: DashboardStatusItem[];
}

const STATUS_COLORS = {
    PENDENTE: "#f59e0b",
    CONCLUIDO: "#22c55e",
    CANCELADO: "#ef4444"
};

const STATUS_LABELS = {
    PENDENTE: "Pendente",
    CONCLUIDO: "Concluído",
    CANCELADO: "Cancelado"
};

export function DashboardStatusChart({
    data
}: DashboardStatusChartProps) {

    const totalOrders = data.reduce(
        (total, item) => total + item.total,
        0
    );

    const chartData = data.map(item => ({
        ...item,
        label: STATUS_LABELS[item.status],
        percentage:
            totalOrders > 0
                ? (item.total / totalOrders) * 100
                : 0
    }));

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider"
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600 }}
                >
                    Pedidos por status
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Distribuição dos pedidos
                </Typography>

                <Box
                    sx={{
                        width: "100%",
                        mt: 2
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: 230
                        }}
                    >
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="total"
                                    nameKey="label"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={3}
                                >
                                    {chartData.map(item => (
                                        <Cell
                                            key={item.status}
                                            fill={
                                                STATUS_COLORS[item.status]
                                            }
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    formatter={(value, _name, item) => [
                                        `${value} pedidos (${item.payload.percentage.toFixed(1)}%)`,
                                        item.payload.label
                                    ]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: {
                                xs: 1.5,
                                sm: 2
                            },
                            mt: 1
                        }}
                    >
                        {chartData.map((item) => (
                            <Box
                                key={item.status}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.75
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 0.5,
                                        flexShrink: 0,
                                        backgroundColor:
                                            STATUS_COLORS[item.status]
                                    }}
                                />

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {item.label}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 700
                                    }}
                                >
                                    {item.percentage.toFixed(1)}%
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}