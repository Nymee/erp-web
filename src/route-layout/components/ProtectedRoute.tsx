import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("decodedToken");
  const role = token ? JSON.parse(token).role : null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" replace />;
    // Or return a custom unauthorized component instead
  }
};

export default ProtectedRoute;
