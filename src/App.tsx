import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./modules/sidebar/Sidebar";
import LoginPage from "./modules/auth/pages/LoginPage";
import SignUpPage from "./modules/auth/pages/SignUpPage";
import UserPage from "./modules/user/pages/UserPage";
import ProtectedRoute from "./route-layout/components/ProtectedRoute";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function App() {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
    const [authProcessing, setAuthProcessing] = useState(true); // Add this


  useEffect(() => {
    const handleAuth = async () => {
      console.log("isAuthenticated:", isAuthenticated);
      console.log("isLoading:", isLoading);

      if (isLoading) return;

      if (isAuthenticated) {
        const existingToken = localStorage.getItem("token");

        if (!existingToken) {
          try {
            const token = await getAccessTokenSilently({
              authorizationParams: {
                audience: "https://api.salesphere.com",
              },
            });

            const decodedToken: any = jwtDecode(token);

            localStorage.setItem("token", token);
            localStorage.setItem("decodedToken", JSON.stringify(decodedToken));

            const role =
              decodedToken["https://api.salesphere.com/role"] ||
              decodedToken.role;
            console.log(role, "roleeeeeeeeeee")
            if (role === "ADMIN") {
              navigate("/company");
            } else {
              navigate("/user");
            }
          } catch (error) {
            console.error("Error:", error);

          }
        }
        setAuthProcessing(false); // Done processing

      } else if (!isLoading && location.pathname === "/") {
        // Only redirect to login if not authenticated and not loading
        setAuthProcessing(false);
        navigate("/login");
      } else if (!isLoading) {
        // Not authenticated and not on home page
        setAuthProcessing(false);
      }
    };

    handleAuth();
  }, [isAuthenticated, isLoading, getAccessTokenSilently, navigate, location]);

  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/sign-up";

  // Don't render sidebar until auth is processed or we're on a public route
  const shouldShowSidebar = !hideSidebar && !authProcessing;

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {shouldShowSidebar && <Sidebar />}

      <div className={`flex-1 ${!hideSidebar ? "overflow-y-auto" : ""}`}>
        <div className={`${!hideSidebar ? "p-6 h-full" : ""}`}>
          <Routes>
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />

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
