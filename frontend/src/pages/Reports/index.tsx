import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography
} from "@mui/material";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

import { PageHeader } from "../../components/common/PageHeader";

import { useReports } from "../../hooks/useReports";

export function Reports() {

    const {
        reports,
        loading
    } = useReports();

    if (loading) {

        return (

            <>

                <PageHeader
                    title="Relatórios"
                    subtitle="Acompanhe os resultados e indicadores do sistema."
                />

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

            </>

        );

    }

    if (!reports) {

        return null;

    }

    return (

        <>

            <PageHeader
                title="Relatórios"
                subtitle="Acompanhe os resultados e indicadores do sistema."
            />

            {/* Indicadores */}

            <Grid
                container
                spacing={3}
            >

                <Grid size={{ xs: 12, md: 6 }}>

                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            border: "1px solid #e5e7eb"
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Total de pedidos
                            </Typography>

                            <Typography
                                variant="h4"
                                sx={{
                                    mt: 1,
                                    fontWeight: 700
                                }}
                            >
                                {reports.totalOrders}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            border: "1px solid #e5e7eb"
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Total de vendas
                            </Typography>

                            <Typography
                                variant="h4"
                                sx={{
                                    mt: 1,
                                    fontWeight: 700
                                }}
                            >
                                {reports.totalSales.toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL"
                                    }
                                )}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            {/* Status */}

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
                        Pedidos por status
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                    >

                        {reports.status.map((item) => (

                            <Grid
                                key={item.status}
                                size={{
                                    xs: 12,
                                    sm: 4
                                }}
                            >

                                <Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {item.status}
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mt: 1,
                                            fontWeight: 700
                                        }}
                                    >
                                        {item.quantity}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {item.total.toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL"
                                            }
                                        )}
                                    </Typography>

                                </Box>

                            </Grid>

                        ))}

                    </Grid>

                </CardContent>

            </Card>

            {/* Produto mais vendido */}

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
                        Produtos mais vendidos
                    </Typography>

                    {reports.topProducts.map((product) => (

                        <Box
                            key={product.productId}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                py: 1
                            }}
                        >

                            <Box>

                                <Typography
                                    sx={{
                                        fontWeight: 600
                                    }}
                                >
                                    {product.productName}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {product.quantity} unidades
                                </Typography>

                            </Box>

                            <Typography
                                sx={{
                                    fontWeight: 600
                                }}
                            >
                                {product.total.toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL"
                                    }
                                )}
                            </Typography>

                        </Box>

                    ))}

                </CardContent>

            </Card>

            {/* Gráfico */}

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
                        Vendas por mês
                    </Typography>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={reports.chart}
                        >

                            <XAxis
                                dataKey="month"
                            />

                            <YAxis />

                            <Tooltip
                                formatter={(value) =>
                                    Number(value).toLocaleString(
                                        "pt-BR",
                                        {
                                            style: "currency",
                                            currency: "BRL"
                                        }
                                    )
                                }
                            />

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

        </>

    );
}