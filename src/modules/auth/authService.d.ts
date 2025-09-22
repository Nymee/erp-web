import type { Login, SignUp } from "../../interfaces/interfaces";
declare function loginUser(payload: Login): Promise<any>;
declare function signUp(payload: SignUp): Promise<any>;
declare const _default: {
    loginUser: typeof loginUser;
    signUp: typeof signUp;
};
export default _default;
