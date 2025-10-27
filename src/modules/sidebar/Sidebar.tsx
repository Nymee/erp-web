import { Home, Users, Building2, LogOut, Package } from "lucide-react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const role = JSON.parse(localStorage.getItem("decodedToken") || "{}")?.role;

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-blue-50 to-white border-r border-blue-100 shadow-lg flex flex-col">
      {/* Logo with gradient background */}
      <div className="p-6 mb-2">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          SaleSphere
        </div>
        <div className="text-xs text-gray-500 mt-1">Enterprise Resource Planning</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {role === "ADMIN" ? (
          <NavLink
            to="/company"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer group
           ${
             isActive
               ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md shadow-blue-200"
               : "text-gray-700 hover:bg-white hover:shadow-md hover:text-blue-600"
           }`
            }
          >
            <Building2 size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Company</span>
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/user"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer group
           ${
             isActive
               ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md shadow-blue-200"
               : "text-gray-700 hover:bg-white hover:shadow-md hover:text-blue-600"
           }`
              }
            >
              <Home size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Executives</span>
            </NavLink>

            <NavLink
              to="/client"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer group
           ${
             isActive
               ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md shadow-blue-200"
               : "text-gray-700 hover:bg-white hover:shadow-md hover:text-blue-600"
           }`
              }
            >
              <Users size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Customers</span>
            </NavLink>

            <NavLink
              to="/product"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer group
           ${
             isActive
               ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md shadow-blue-200"
               : "text-gray-700 hover:bg-white hover:shadow-md hover:text-blue-600"
           }`
              }
            >
              <Package size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Products</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* Logout at bottom with glass effect */}
      <div className="p-4">
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<LogOut size={18} />}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '10px',
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
              backgroundColor: 'rgba(239, 68, 68, 0.05)',
            }
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}