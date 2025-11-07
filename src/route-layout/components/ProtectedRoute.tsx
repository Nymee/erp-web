import { Navigate, Outlet, useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    const fetchRole = async () => {
      // Don't check role if Auth0 is still loading
      if (isLoading) {
        return;
      }

      // Only fetch role if authenticated
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://api.salesphere.com",
            },
          });

          const decodedToken: any = jwtDecode(token);
          const role =
            decodedToken["https://api.salesphere.com/role"] ||
            decodedToken.role;

          setUserRole(role);
        } catch (error) {
          console.error("Error fetching token:", error);
          setUserRole(null);
        }
      }

      setCheckingRole(false);
    };

    fetchRole();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  // Show loading while Auth0 is loading or while checking role
  if (isLoading || checkingRole) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (userRole && allowedRoles.includes(userRole)) {
    return <Outlet />;
  }

  // User doesn't have required role
  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
