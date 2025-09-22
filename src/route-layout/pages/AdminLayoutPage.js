import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
const AdminLayoutPage = () => {
    return (_jsx(ProtectedRoute, { allowedRoles: ["admin"], children: _jsx(Outlet, {}) }));
};
