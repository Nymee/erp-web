import SignUpForm from "../components/SignUpForm";
import type { SignUp } from "../../../interfaces/interfaces";
import { useState } from "react";
import authService from "../authService";
import { set } from "react-hook-form";

const SignUpPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const onSubmit = async (data: SignUp) => {
    try {
      setLoading(true);
      setError("");
      const res = await authService.signUp(data);
      if (res.status == 201) {
        setCreated(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {created ? (
        <p>Account Created Successfully</p>
      ) : (
        <SignUpForm onSubmit={onSubmit} loading={loading} />
      )}
    </div>
  );
};

export default SignUpPage;
