import {
    Box,
    Typography
} from "@mui/material";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export function PageHeader({
    title,
    subtitle,
    children
}: PageHeaderProps) {

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                gap: { xs: 2, sm: 3 },
                mb: 4
            }}
        >
            {/* Título + Subtítulo */}
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700
                    }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.5
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>

            {/* Ações (Search + Botão) */}
            {children && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1.5,
                        width: { xs: "100%", sm: "auto" }
                    }}
                >
                    {children}
                </Box>
            )}
        </Box>

    );

}