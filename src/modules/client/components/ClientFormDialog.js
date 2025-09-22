import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// ✅ Validation Schema
const createClientSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email_id: yup.string().email("Invalid email").required("Email is required"),
    mobile: yup.string().required("Mobile is required"),
    address: yup.string().required("Address is required"),
});
const ClientFormDialog = ({ open, onClose, onSubmit, }) => {
    const { control, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: yupResolver(createClientSchema),
        defaultValues: {
            name: "",
            email_id: "",
            mobile: "",
            address: "",
        },
    });
    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset();
        onClose();
    };
    return (_jsxs(Dialog, { open: open, onClose: onClose, maxWidth: "sm", fullWidth: true, children: [_jsx(DialogTitle, { children: "Add Client" }), _jsxs(DialogContent, { dividers: true, children: [_jsx(Controller, { name: "name", control: control, render: ({ field }) => (_jsx(TextField, { ...field, margin: "dense", label: "Name", fullWidth: true, error: !!errors.name, helperText: errors.name?.message })) }), _jsx(Controller, { name: "email_id", control: control, render: ({ field }) => (_jsx(TextField, { ...field, margin: "dense", label: "Email", fullWidth: true, error: !!errors.email_id, helperText: errors.email_id?.message })) }), _jsx(Controller, { name: "mobile", control: control, render: ({ field }) => (_jsx(TextField, { ...field, margin: "dense", label: "Mobile", fullWidth: true, error: !!errors.mobile, helperText: errors.mobile?.message })) }), _jsx(Controller, { name: "address", control: control, render: ({ field }) => (_jsx(TextField, { ...field, margin: "dense", label: "Address", fullWidth: true, multiline: true, rows: 2, error: !!errors.address, helperText: errors.address?.message })) })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: onClose, color: "inherit", children: "Cancel" }), _jsx(Button, { onClick: handleSubmit(handleFormSubmit), variant: "contained", children: "Create" })] })] }));
};
export default ClientFormDialog;
