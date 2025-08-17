import { Outlet } from "react-router-dom"
import ProtectedRoute from "../components/ProtectedRoute"

const userLayoutPages = () =>{


    <ProtectedRoute allowedRoles={["sales", "sau"]}>
        <Outlet/>
    </ProtectedRoute>
    



}