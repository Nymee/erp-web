import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
const userLayoutPages = () => {
    _jsx(ProtectedRoute, { allowedRoles: ["sales", "sau"], children: _jsx(Outlet, {}) });
};
