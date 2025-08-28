import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { jwtDecode } from "jwt-decode";
import type { Login } from "../../../interfaces/interfaces";
import authService from "../services/authService";
const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ email, password }: Login) {
    setLoading(true);
    setError("");
    try {
      const data = await authService.loginUser({
        email: email,
        password: password,
      });
      const decodedToken = jwtDecode(data.token);
      localStorage.setItem("token", JSON.stringify(decodedToken));
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      {error && <p>{error}</p>}
      <LoginForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default LoginPage;
