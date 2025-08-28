import SignUpForm from "../components/SignUpForm";
import type { SignUp } from "../../../interfaces/interfaces";
import authService from "../services/authService";
import { useState } from "react";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: SignUp) => {
    try {
      setLoading(true);
      setError("");
      const res = authService.signUp(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SignUpForm onSubmit={onSubmit} loading={loading} />
    </div>
  );
};
