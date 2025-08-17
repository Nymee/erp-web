import { Outlet } from "react-router-dom"
import ProtectedRoute from "../components/ProtectedRoute"

const AdminLayoutPage = () =>{

return(
    <ProtectedRoute allowedRoles={["admin"]} >
        <Outlet/>
    </ProtectedRoute>
)
}