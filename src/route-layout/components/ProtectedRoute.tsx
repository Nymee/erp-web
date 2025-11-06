import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (isLoading) return;

      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://api.salesphere.com",
            },
          });

          const decodedToken: any = jwtDecode(token);
          const role = decodedToken["https://api.salesphere.com/role"] || decodedToken.role;

          console.log("Role:", role);
          console.log("Allowed roles:", allowedRoles);

          setUserRole(role);
        } catch (error) {
          console.error("Error fetching token:", error);
          setUserRole(null);
        }
      }

      setCheckingRole(false);
    };

    fetchRole();
  }, [isAuthenticated, isLoading, getAccessTokenSilently, allowedRoles]);

  // Still loading auth state or checking role
  if (isLoading || checkingRole) {
    return null; // or a loading spinner
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (userRole && allowedRoles.includes(userRole)) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
};

export default ProtectedRoute;