import SearchIcon from "@mui/icons-material/Search";

import {
    Box,
    TextField
} from "@mui/material";

interface SearchFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function SearchField({
    value,
    onChange,
    placeholder = "Pesquisar..."
}: SearchFieldProps) {

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
            }}
        >

            <SearchIcon color="action" />

            <TextField
                size="small"
                value={value}
                placeholder={placeholder}
                onChange={(e) =>
                    onChange(e.target.value)
                }
            />

        </Box>

    );

}