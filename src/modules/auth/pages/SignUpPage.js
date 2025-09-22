import { jsx as _jsx } from "react/jsx-runtime";
import SignUpForm from "../components/SignUpForm";
import { useState } from "react";
import authService from "../authService";
import { set } from "react-hook-form";
const SignUpPage = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [created, setCreated] = useState(false);
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError("");
            const res = await authService.signUp(data);
            if (res.status == 201) {
                setCreated(true);
            }
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { children: created ? (_jsx("p", { children: "Account Created Successfully" })) : (_jsx(SignUpForm, { onSubmit: onSubmit, loading: loading })) }));
};
export default SignUpPage;
