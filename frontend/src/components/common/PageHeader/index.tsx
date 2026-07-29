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
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4
            }}
        >

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
                            mt: 1
                        }}
                    >
                        {subtitle}
                    </Typography>

                )}

            </Box>

            {children}

        </Box>

    );

}