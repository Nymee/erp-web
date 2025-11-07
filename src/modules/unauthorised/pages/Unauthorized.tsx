import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>
        <Button
          variant="contained"
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate(-1)}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            padding: "10px 24px",
          }}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
