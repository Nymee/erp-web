import type { Login } from "../../../interfaces/interfaces";
interface LoginProps {
    onSubmit: ({ email, password }: Login) => void;
    loading: boolean;
}
declare const LoginForm: ({ onSubmit, loading }: LoginProps) => import("react/jsx-runtime").JSX.Element;
export default LoginForm;
