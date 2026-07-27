import {
    Box,
    Typography
} from "@mui/material";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export function PageHeader({
    title,
    subtitle
}: PageHeaderProps) {
    return (
        <Box
            sx={{
                mb: 4
            }
            }
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700
                }}
            >
                {title}
            </Typography>

            {
                subtitle && (
                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 1
                        }
                        }
                    >
                        {subtitle}
                    </Typography>
                )}
        </Box>
    );
}