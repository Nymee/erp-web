import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./modules/sidebar/Sidebar";
import LoginPage from "./modules/auth/pages/LoginPage";
import SignUpPage from "./modules/auth/pages/SignUpPage";
import UserPage from "./modules/user/pages/UserPage";
import ProtectedRoute from "./route-layout/components/ProtectedRoute";
import ClientPage from "./modules/client/pages/ClientPage";
import ProductPage from "./modules/products/pages/ProductPage";
import CompanyPage from "./modules/company/pages/CompanyPage";
import SalesListingPage from "./modules/sales/pages/SalesListingPage";
import CheckoutPage from "./modules/sales/pages/CheckoutPage";
import AddProduct from "./modules/sales/pages/AddProduct";
export default function App() {
    const location = useLocation();
    const hideSidebar = location.pathname === "/login" || location.pathname === "/sign-up";
    return (_jsxs("div", { className: "flex min-h-screen", children: [!hideSidebar && (_jsx("div", { className: "w-64 bg-blue-800 text-white", children: _jsx(Sidebar, {}) })), _jsx("div", { className: "flex-1 p-4", children: _jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(ProtectedRoute, { allowedRoles: ["SAU", "SALES"] }), children: [_jsx(Route, { path: "/user", element: _jsx(UserPage, {}) }), _jsx(Route, { path: "/client", element: _jsx(ClientPage, {}) }), _jsx(Route, { path: "/product", element: _jsx(ProductPage, {}) }), _jsx(Route, { path: "/add-product", element: _jsx(AddProduct, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(CheckoutPage, {}) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/user", replace: true }) })] }), _jsx(Route, { element: _jsx(ProtectedRoute, { allowedRoles: ["ADMIN"] }), children: _jsx(Route, { path: "/company", element: _jsx(CompanyPage, {}) }) }), _jsxs(Route, { path: "/", children: [_jsx(Route, { path: "/sign-up", element: _jsx(SignUpPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) })] })] }) })] }));
}
