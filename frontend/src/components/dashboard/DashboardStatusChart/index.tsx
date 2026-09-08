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
    Legend
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

    const chartData = data.map(item => ({
        ...item,
        label: STATUS_LABELS[item.status]
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
                        height: 300,
                        mt: 2
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
                                cy="45%"
                                innerRadius={65}
                                outerRadius={100}
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
                                formatter={(value) => [
                                    value,
                                    "Pedidos"
                                ]}
                            />

                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}