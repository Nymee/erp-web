import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("decodedToken");
  const role = token ? JSON.parse(token).role : null;
  const exp = token ? JSON.parse(token).exp : null;
  let expired = false;

  if (exp) {
    const currentTime = Date.now() / 1000;
    expired = exp < currentTime;
  }

  console.log(token, "tokennnnn");

  if (!token || expired === true) {
    localStorage.removeItem("decodedToken");
    return <Navigate to="/login" replace />; //rest of the code wont run once this is returned
  }

  if (role && allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" replace />;
    // Or return a custom unauthorized component instead
  }
};

export default ProtectedRoute;
