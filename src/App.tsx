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
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/sign-up";

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && (
        <div className="w-64 bg-blue-800 text-white">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 p-4">
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={["SAU", "SALES"]} />}>
            <Route path="/user" element={<UserPage />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/" element={<Navigate to="/user" replace />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/company" element={<CompanyPage />} />
          </Route>

          <Route path="/">
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
