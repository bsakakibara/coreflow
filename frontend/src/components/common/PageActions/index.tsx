import {
    Box
} from "@mui/material";

interface PageActionsProps {
    children: React.ReactNode;
}

export function PageActions({
    children
}: PageActionsProps) {

    return (

        <Box
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "center"
            }}
        >

            {children}

        </Box>

    );

}