const apiUrl = import.meta.env.VITE_API_URL;


interface LoginPayload{
    email: string,
    password: string
}


async function loginUser(payload:LoginPayload ){
    try{
    const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify(payload)
        },
    );
    if(!res.ok){              //if status is not 2xx
        const error =  await res.json();
        throw new Error(error || "Login failed");
    }
     return await res.json();
    }
    catch(err){
        throw err;
    }

}



export default loginUser;