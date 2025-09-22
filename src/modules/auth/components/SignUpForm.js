import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Company name is required"),
    email_id: Yup.string()
        .email("Invalid company email")
        .required("Company email is required"),
    mobile: Yup.string().required("Company mobile is required"),
    user_name: Yup.string().required("Admin name is required"),
    user_email: Yup.string()
        .email("Invalid admin email")
        .required("Admin email is required"),
    user_mobile: Yup.string().required("Admin mobile is required"),
});
const SignUpForm = ({ onSubmit, loading }) => {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(signUpSchema),
    });
    return (_jsx("div", { className: "flex justify-center items-center min-h-screen bg-blue-50", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "bg-white shadow-md rounded-lg p-6 w-full max-w-lg", children: [_jsx("h2", { className: "text-2xl font-bold text-center mb-6 text-blue-600", children: "Create Company Account" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("input", { type: "text", placeholder: "Company Name", ...register("name"), className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" }), errors.name && (_jsx("p", { className: "text-red-500 text-sm", children: errors.name.message }))] }), _jsxs("div", { children: [_jsx("input", { type: "email", placeholder: "Company Email", ...register("email_id"), className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" }), errors.email_id && (_jsx("p", { className: "text-red-500 text-sm", children: errors.email_id.message }))] }), _jsxs("div", { children: [_jsx("input", { type: "text", placeholder: "Company Mobile", ...register("mobile"), className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" }), errors.mobile && (_jsx("p", { className: "text-red-500 text-sm", children: errors.mobile.message }))] }), _jsxs("div", { children: [_jsx("input", { type: "text", placeholder: "Admin Name", ...register("user_name"), className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" }), errors.user_name && (_jsx("p", { className: "text-red-500 text-sm", children: errors.user_name.message }))] }), _jsxs("div", { children: [_jsx("input", { type: "email", placeholder: "Admin Email", ...register("user_email"), className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" }), errors.user_email && (_jsx("p", { className: "text-red-500 text-sm", children: errors.user_email.message }))] }), _jsxs("div", { children: [_jsx("input", { type: "text", placeholder: "Admin Mobile", ...register("user_mobile"), className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" }), errors.user_mobile && (_jsx("p", { className: "text-red-500 text-sm", children: errors.user_mobile.message }))] })] }), _jsx("button", { type: "submit", className: "mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition", disabled: loading, children: loading ? "Creating..." : "Sign Up" })] }) }));
};
export default SignUpForm;
