import { Home, Users, Building2, LogOut } from "lucide-react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const role = JSON.parse(localStorage.getItem("decodedToken") || "{}")?.role;

  return (
    <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col">
      {/* Logo */}
      <div className="p-4 text-2xl font-bold text-blue-600">ERP</div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-2">
        {role === "ADMIN" ? (
          <NavLink
            to="/company"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition cursor-pointer
           ${
             isActive
               ? "bg-blue-100 text-blue-600"
               : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
           }`
            }
          >
            <Building2 size={20} />
            <span className="font-medium">Company</span>
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/user"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition cursor-pointer
           ${
             isActive
               ? "bg-blue-100 text-blue-600"
               : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
           }`
              }
            >
              <Home size={20} />
              <span className="font-medium">User</span>
            </NavLink>

            <NavLink
              to="/client"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition cursor-pointer
           ${
             isActive
               ? "bg-blue-100 text-blue-600"
               : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
           }`
              }
            >
              <Users size={20} />
              <span className="font-medium">Clients</span>
            </NavLink>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition cursor-pointer
           ${
             isActive
               ? "bg-blue-100 text-blue-600"
               : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
           }`
              }
            >
              <Users size={20} />
              <span className="font-medium">Products</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* Logout at bottom */}
      <div className="p-4">
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={<LogOut size={18} />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
