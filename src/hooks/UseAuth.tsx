import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface UseAuthReturn {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  role: string | null;
  logout: () => void;
  getToken: () => Promise<string>;
}

export const useAuth = (): UseAuthReturn => {
  const {
    isLoading: auth0Loading,
    isAuthenticated,
    user,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [role, setRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!auth0Loading && isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://api.salesphere.com",
            },
          });

          const decoded: any = jwtDecode(token);
          const userRole =
            decoded["https://api.salesphere.com/role"] || decoded.role;
          setRole(userRole);
        } catch (error) {
          console.error("Error fetching role:", error);
          setRole(null);
        }
      }
      setRoleLoading(false);
    };

    fetchRole();
  }, [auth0Loading, isAuthenticated, getAccessTokenSilently]);

  const getToken = async () => {
    return await getAccessTokenSilently({
      authorizationParams: {
        audience: "https://api.salesphere.com",
      },
    });
  };

  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return {
    isLoading: auth0Loading || (isAuthenticated && roleLoading),
    isAuthenticated,
    user,
    role,
    logout,
    getToken,
  };
};
