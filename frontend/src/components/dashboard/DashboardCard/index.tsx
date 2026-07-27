import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

export function DashboardCard({
    title,
    value,
    icon,
    color
}: DashboardCardProps) {

    return (

        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                transition: ".2s",

                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 4
                }
            }}
        >

            <CardContent>
                
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
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
                                fontWeight: 700
                            }}
                        >
                            {value}
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            borderRadius: "50%",
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