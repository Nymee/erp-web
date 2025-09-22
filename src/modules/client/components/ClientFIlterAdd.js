import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TextField, Button } from "@mui/material";
import { Plus } from "lucide-react";
const ClientFilterAdd = ({ search, setSearch, onAddClient }) => {
    return (_jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            gap: "1rem",
        }, children: [_jsx(TextField, { id: "outlined-controlled", label: "Search Client", variant: "outlined", size: "small", value: search, onChange: (event) => {
                    setSearch(event.target.value);
                }, style: { flex: 1 } }), _jsx(Button, { variant: "contained", color: "primary", startIcon: _jsx(Plus, { size: 18 }), onClick: onAddClient, sx: { borderRadius: "8px", textTransform: "none" }, children: "Add Client" })] }));
};
export default ClientFilterAdd;
