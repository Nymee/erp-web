import { Home, Users, Building2, LogOut } from "lucide-react";
import { Button } from "@mui/material";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col">
      {/* Logo */}
      <div className="p-4 text-2xl font-bold text-blue-600">ERP</div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-2">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-600 transition">
          <Home size={20} />
          <span className="font-medium">Dashboard</span>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-600 transition">
          <Building2 size={20} />
          <span className="font-medium">Company</span>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-600 transition">
          <Users size={20} />
          <span className="font-medium">Clients</span>
        </div>
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
