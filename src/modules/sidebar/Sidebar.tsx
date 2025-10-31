import {
  Home,
  Users,
  Building2,
  LogOut,
  Package,
  ShoppingCart,
  FileText,
  FolderOpen,
  PlusCircle,
  ChevronDown,
  ChevronRight,
  Truck,
} from "lucide-react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const role = JSON.parse(localStorage.getItem("decodedToken") || "{}")?.role;
  const [salesOpen, setSalesOpen] = useState(true);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer group
     ${
       isActive
         ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md shadow-blue-200"
         : "text-gray-700 hover:bg-white hover:shadow-md hover:text-blue-600"
     }`;

  const subLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 pl-10 pr-3 py-2 rounded-lg transition-all duration-200 text-sm
     ${
       isActive
         ? "bg-blue-100 text-blue-800 font-medium"
         : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
     }`;

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-blue-50 to-white border-r border-blue-100 shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 mb-2">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          SaleSphere
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Enterprise Resource Planning
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {role === "ADMIN" ? (
          <NavLink to="/company" className={navLinkClasses}>
            <Building2
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-medium">Company</span>
          </NavLink>
        ) : (
          <>
            <NavLink to="/user" className={navLinkClasses}>
              <Home
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">Executives</span>
            </NavLink>

            <NavLink to="/client" className={navLinkClasses}>
              <Users
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">Customers</span>
            </NavLink>

            <NavLink to="/supplier" className={navLinkClasses}>
              <Truck
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">Suppliers</span>
            </NavLink>

            <NavLink to="/product" className={navLinkClasses}>
              <Package
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">Products</span>
            </NavLink>

            {/* Collapsible Sales Section */}
            <div>
              <button
                onClick={() => setSalesOpen(!salesOpen)}
                className="flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 cursor-pointer text-gray-700 hover:bg-white hover:shadow-md hover:text-blue-600"
              >
                <div className="flex items-center gap-3">
                  <FolderOpen
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="font-medium">Sales</span>
                </div>
                {salesOpen ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {salesOpen && (
                <div className="space-y-1 mt-1">
                  <NavLink to="/sales/all" className={subLinkClasses}>
                    <FileText size={16} />
                    All Sales
                  </NavLink>

                  <NavLink to="/sales/drafts" className={subLinkClasses}>
                    <FileText size={16} />
                    Drafts
                  </NavLink>

                  <NavLink to="/sales/orders" className={subLinkClasses}>
                    <ShoppingCart size={16} />
                    Orders
                  </NavLink>

                  <NavLink to="/sales/add-product" className={subLinkClasses}>
                    <PlusCircle size={16} />
                    New Sale
                  </NavLink>
                </div>
              )}
            </div>
          </>
        )}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<LogOut size={18} />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 500,
            padding: "10px",
            borderWidth: "1.5px",
            "&:hover": {
              borderWidth: "1.5px",
              backgroundColor: "rgba(239, 68, 68, 0.05)",
            },
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
