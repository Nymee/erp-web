import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";

/**
 * Component that handles initial routing based on authentication and user role.
 * Redirects authenticated users to their role-based home page.
 * Redirects unauthenticated users to login.
 */
export default function AuthRedirect() {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleRedirect = async () => {
      // Wait for Auth0 to finish loading
      if (isLoading) return;

      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://api.salesphere.com",
            },
          });

          const decoded: any = jwtDecode(token);
          const role =
            decoded["https://api.salesphere.com/role"] || decoded.role;

          // Check if we have a saved location from before login
          const from = location.state?.from?.pathname || null;

          // Navigate based on role or to saved location
          if (from && from !== "/") {
            navigate(from, { replace: true });
          } else if (role === "ADMIN") {
            navigate("/company", { replace: true });
          } else {
            navigate("/user", { replace: true });
          }
        } catch (err) {
          console.error("Token fetch error:", err);
          navigate("/login", { replace: true });
        }
      } else {
        navigate("/login", { replace: true });
      }
    };

    handleRedirect();
  }, [isAuthenticated, isLoading, getAccessTokenSilently, navigate, location]);

  // Show loading spinner while checking auth
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
