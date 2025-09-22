import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, } from "@mui/material";
const ConfirmationPopup = ({ open, title, message, onConfirm, onClose, confirmText = "Confirm", cancelText = "Cancel", }) => {
    return (_jsxs(Dialog, { open: open, onClose: onClose, maxWidth: "xs", fullWidth: true, children: [_jsx(DialogTitle, { children: title }), _jsx(DialogContent, { children: _jsx(Typography, { children: message }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: onClose, variant: "outlined", color: "inherit", children: cancelText }), _jsx(Button, { onClick: () => {
                            onConfirm();
                            onClose();
                        }, variant: "contained", color: "primary" // ✅ Blue-themed button
                        , children: confirmText })] })] }));
};
export default ConfirmationPopup;
