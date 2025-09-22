import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});
const LoginForm = ({ onSubmit, loading }) => {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(loginSchema),
    });
    return (_jsx("div", { className: "flex justify-center items-center min-h-screen bg-blue-50", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "bg-white shadow-md rounded-lg p-6 w-full max-w-md", children: [_jsx("h2", { className: "text-2xl font-bold text-center mb-6 text-blue-600", children: "Login" }), _jsxs("div", { className: "mb-4", children: [_jsx("input", { type: "email", placeholder: "Enter Email", ...register("email"), className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" }), errors.email && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.email.message }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("input", { type: "password", placeholder: "Enter Password", ...register("password"), className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" }), errors.password && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.password.message }))] }), _jsx("button", { type: "submit", className: "w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition", disabled: loading, children: loading ? "Logging in..." : "Login" })] }) }));
};
export default LoginForm;
