import { useState } from "react";
import LoginForm from "../components/LoginForm";
import loginUser from "../services/authService";
import { jwtDecode } from "jwt-decode";

const Login = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    async function handleSubmit (email: string, password:string){
        setLoading(true);
        setError("");
        try{
            const data = await loginUser({
            email: email,
            password: password
             });    
            const decodedToken = jwtDecode(data.token);
            localStorage.setItem("token", JSON.stringify(decodedToken));
            window.location.href = "/dashboard";
        }
        catch(err:any){
            setError(err.message);
        }finally{
            setLoading(false);
        }
       
    }
    return(
        <div>
            {error&& <p>{error}</p>}
            <LoginForm onSubmit ={handleSubmit} loading={loading}/>
        </div>
    )
}


export default Login;