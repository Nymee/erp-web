import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("decodedToken");
  const decodedToken = token ? JSON.parse(token) : null;
  
  // Fix: Use the namespaced key
  const role = decodedToken ? decodedToken["https://api.salesphere.com/role"] : null;
  const exp = decodedToken ? decodedToken.exp : null;
  
  let expired = false;

  if (exp) {
    const currentTime = Date.now() / 1000;
    expired = exp < currentTime;
  }

  console.log("Role:", role);
  console.log("Allowed roles:", allowedRoles);

  if (!token || expired === true) {
    localStorage.removeItem("decodedToken");
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  if (role && allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
};

export default ProtectedRoute;