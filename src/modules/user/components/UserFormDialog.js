import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// ✅ Validation Schema (matches your backend fields)
const createUserSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    mobile: yup.string().required("Mobile is required"),
    role: yup.string().oneOf(["SAU", "SE", "MG", "ADMIN"]).default("SAU"),
});
const UserFormDialog = ({ open, onClose, onSubmit, }) => {
    const { control, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: yupResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: "",
            mobile: "",
            role: "SAU",
        },
    });
    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset();
        onClose();
    };
    return (_jsxs(Dialog, { open: open, onClose: onClose, maxWidth: "sm", fullWidth: true, children: [_jsx(DialogTitle, { children: "Add User" }), _jsxs(DialogContent, { dividers: true, children: [_jsx(Controller, { name: "name", control: control, render: ({ field }) => (_jsx(TextField, { ...field, margin: "dense", label: "Name", fullWidth: true, error: !!errors.name, helperText: errors.name?.message })) }), _jsx(Controller, { name: "email", control: control, render: ({ field }) => (_jsx(TextField, { ...field, margin: "dense", label: "Email", fullWidth: true, error: !!errors.email, helperText: errors.email?.message })) }), _jsx(Controller, { name: "mobile", control: control, render: ({ field }) => (_jsx(TextField, { ...field, margin: "dense", label: "Mobile", fullWidth: true, error: !!errors.mobile, helperText: errors.mobile?.message })) }), _jsx(Controller, { name: "role", control: control, render: ({ field }) => (_jsxs(TextField, { ...field, select: true, margin: "dense", label: "Role", fullWidth: true, error: !!errors.role, helperText: errors.role?.message, children: [_jsx(MenuItem, { value: "SAU", children: "SAU" }), _jsx(MenuItem, { value: "SE", children: "SE" }), _jsx(MenuItem, { value: "MG", children: "MG" }), _jsx(MenuItem, { value: "ADMIN", children: "ADMIN" })] })) })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: onClose, color: "inherit", children: "Cancel" }), _jsx(Button, { onClick: handleSubmit(handleFormSubmit), variant: "contained", children: "Create" })] })] }));
};
export default UserFormDialog;
