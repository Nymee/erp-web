import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Home, Users, Building2, LogOut } from "lucide-react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
    const role = JSON.parse(localStorage.getItem("decodedToken") || "{}")?.role;
    return (_jsxs("div", { className: "h-screen w-64 bg-white border-r shadow-sm flex flex-col", children: [_jsx("div", { className: "p-4 text-2xl font-bold text-blue-600", children: "ERP" }), _jsx("nav", { className: "flex-1 px-2 space-y-2", children: role === "ADMIN" ? (_jsxs(NavLink, { to: "/company", className: ({ isActive }) => `flex items-center gap-3 p-2 rounded-lg transition cursor-pointer
           ${isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`, children: [_jsx(Building2, { size: 20 }), _jsx("span", { className: "font-medium", children: "Company" })] })) : (_jsxs(_Fragment, { children: [_jsxs(NavLink, { to: "/user", className: ({ isActive }) => `flex items-center gap-3 p-2 rounded-lg transition cursor-pointer
           ${isActive
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`, children: [_jsx(Home, { size: 20 }), _jsx("span", { className: "font-medium", children: "User" })] }), _jsxs(NavLink, { to: "/client", className: ({ isActive }) => `flex items-center gap-3 p-2 rounded-lg transition cursor-pointer
           ${isActive
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`, children: [_jsx(Users, { size: 20 }), _jsx("span", { className: "font-medium", children: "Clients" })] }), _jsxs(NavLink, { to: "/product", className: ({ isActive }) => `flex items-center gap-3 p-2 rounded-lg transition cursor-pointer
           ${isActive
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`, children: [_jsx(Users, { size: 20 }), _jsx("span", { className: "font-medium", children: "Products" })] })] })) }), _jsx("div", { className: "p-4", children: _jsx(Button, { variant: "outlined", color: "primary", fullWidth: true, startIcon: _jsx(LogOut, { size: 18 }), children: "Logout" }) })] }));
}
