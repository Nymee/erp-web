import type { SignUp } from "../../../interfaces/interfaces";
interface SignUpFormProps {
    onSubmit: (data: SignUp) => void;
    loading: boolean;
}
declare const SignUpForm: ({ onSubmit, loading }: SignUpFormProps) => import("react/jsx-runtime").JSX.Element;
export default SignUpForm;
