import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./modules/sidebar/Sidebar";
import LoginPage from "./modules/auth/pages/LoginPage";
import SignUpPage from "./modules/auth/pages/SignUpPage";
import UserPage from "./modules/user/pages/UserPage";
import ProtectedRoute from "./route-layout/components/ProtectedRoute";
import AuthRedirect from "./route-layout/components/AuthRedirect";
import ClientPage from "./modules/client/pages/ClientPage";
import SupplierPage from "./modules/supplier/pages/SupplierPage";
import ProductPage from "./modules/products/pages/ProductPage";
import InventoryPage from "./modules/inventory/pages/InventoryPage";
import CompanyPage from "./modules/company/pages/CompanyPage";
import SalesListingPage from "./modules/sales/pages/SalesListingPage";
import CheckoutPage from "./modules/sales/pages/CheckoutPage";
import AddProduct from "./modules/sales/pages/AddProduct";
import DraftListingPage from "./modules/sales/pages/DraftListingPage";
import OrderListingPage from "./modules/sales/pages/OrderListingPage";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setTokenGetter } from "./lib/axios";
import UnauthorizedPage from "./modules/unauthorised/pages/Unauthorized";

export default function App() {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const location = useLocation();

  // Initialize axios interceptor with Auth0 token getter (runs once)
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setTokenGetter(async () => {
        return await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://api.salesphere.com",
          },
        });
      });
    }
  }, [getAccessTokenSilently, isLoading, isAuthenticated]);

  // Show loading spinner while Auth0 is initializing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/unauthorized";

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {!hideSidebar && isAuthenticated && <Sidebar />}

      <div className={`flex-1 ${!hideSidebar ? "overflow-y-auto" : ""}`}>
        <div className={`${!hideSidebar ? "p-6 h-full" : ""}`}>
          <Routes>
            <Route path="/" element={<AuthRedirect />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            <Route element={<ProtectedRoute allowedRoles={["SAU", "SALES"]} />}>
              <Route path="/user" element={<UserPage />} />
              <Route path="/client" element={<ClientPage />} />
              <Route path="/supplier" element={<SupplierPage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/sales/add-product" element={<AddProduct />} />
              <Route path="sales/checkout" element={<CheckoutPage />} />
              <Route path="sales/all" element={<SalesListingPage />} />
              <Route path="sales/drafts" element={<DraftListingPage />} />
              <Route path="sales/drafts/:sales_id" element={<CheckoutPage />} />
              <Route path="sales/orders" element={<OrderListingPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/company" element={<CompanyPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
