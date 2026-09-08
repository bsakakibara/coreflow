import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";

interface DashboardCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    color: string;
}

export function DashboardCard({
    title,
    value,
    subtitle,
    icon,
    color
}: DashboardCardProps) {

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                transition: "all .2s ease",

                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 4
                }
            }}
        >
            <CardContent
                sx={{
                    p: 2.5
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 2
                    }}
                >

                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                mt: 1,
                                fontWeight: 700,
                                lineHeight: 1.2
                            }}
                        >
                            {value}
                        </Typography>

                        {subtitle && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: "block",
                                    mt: 1
                                }}
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>

                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            minWidth: 52,
                            borderRadius: 2.5,
                            backgroundColor: color,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff"
                        }}
                    >
                        {icon}
                    </Box>

                </Box>
            </CardContent>
        </Card>
    );
}