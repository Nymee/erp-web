import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode,
    allowedRoles: string[]
}

const ProtectedRoute = ({ allowedRoles, children}: ProtectedRouteProps) => {

    const token = localStorage.getItem("token");
    const role = token? JSON.parse(token).role :null;


    if(!token){
        return <Navigate to = "/login" replace/>
    }

    if(allowedRoles.includes(role)){
        return children;
    }
    else{
        //return unauthorised page
    }
};


export default ProtectedRoute;