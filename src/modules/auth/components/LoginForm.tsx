import React, { useState } from "react"

interface LoginProps {
    onSubmit: (email:string, password:string) => void;
    loading: boolean
}

const LoginForm  =({onSubmit, loading}: LoginProps)=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        onSubmit(email, password);
    }
    return(
        <div>
            <form onSubmit={handleSubmit} >
                <input type = "email" name = "email" placeholder="Enter Email" value={email}
                onChange={(e)=>setEmail(e.target.value)} required>
                </input >
                <input type ="password" name ="password" placeholder = "Enter Password" value={password}
                onChange={(e)=>setPassword(e.target.value)} required>
                </input>
                <button type ="submit">
                    {loading? "Logging in": "Login"}
                </button>
            </form>
        </div>
    )
}


export default LoginForm;