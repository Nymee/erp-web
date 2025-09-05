import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./modules/sidebar/Sidebar";
import LoginPage from "./modules/auth/pages/LoginPage";
import SignUpPage from "./modules/auth/pages/SignUpPage";
import UserPage from "./modules/user/pages/UserPage";
import ProtectedRoute from "./route-layout/components/ProtectedRoute";
import ClientPage from "./modules/client/pages/ClientPage";

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
            <Route path="/" element={<Navigate to="/user" replace />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            {/* <Route path="/company" element={<CompanyPage />} /> */}
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
