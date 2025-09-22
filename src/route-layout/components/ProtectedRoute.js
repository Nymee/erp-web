import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("decodedToken");
    const role = token ? JSON.parse(token).role : null;
    const exp = token ? JSON.parse(token).exp : null;
    let expired = false;
    if (exp) {
        const currentTime = Date.now() / 1000;
        expired = exp < currentTime;
    }
    console.log(token, "tokennnnn");
    if (!token || expired === true) {
        localStorage.removeItem("decodedToken");
        return _jsx(Navigate, { to: "/login", replace: true }); //rest of the code wont run once this is returned
    }
    if (role && allowedRoles.includes(role)) {
        return _jsx(Outlet, {});
    }
    else {
        return _jsx(Navigate, { to: "/unauthorized", replace: true });
        // Or return a custom unauthorized component instead
    }
};
export default ProtectedRoute;
