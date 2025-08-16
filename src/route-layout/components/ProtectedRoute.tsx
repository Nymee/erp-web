import { type ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode,
    allowedRoles: string[]
}



const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {


    const token = localStorage.getItem("token");
    const role = token? JSON.parse(token).role :null;



    if(allowedRoles.includes(role)){
        return children
    }
    else{
        //return unauthorised page
    }
};