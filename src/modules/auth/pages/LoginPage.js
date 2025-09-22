import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { jwtDecode } from "jwt-decode";
import authService from "../authService";
const LoginPage = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    async function handleSubmit({ email, password }) {
        setLoading(true);
        setError("");
        try {
            const data = await authService.loginUser({
                email: email,
                password: password,
            });
            const decodedToken = jwtDecode(data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
            window.location.href = "/user";
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("div", { children: [error && _jsx("p", { children: error }), _jsx(LoginForm, { onSubmit: handleSubmit, loading: loading })] }));
};
export default LoginPage;
