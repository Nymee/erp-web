const apiUrl = import.meta.env.VITE_API_URL;


const getUsers = () => {

    const url = `${apiUrl}/api/user`;
    const users = fetch(url,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => {
        if(!res.ok){
            throw new Error("Failed to fetch users");
        }
        return res.json();
    }).catch(err => {
        throw err;
    })

    return users;
};


const postUsers = (data:any) => {

    const url = `${apiUrl}/users`;
    const users = fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(res => {
        if(!res.ok){
            throw new Error("Failed to create user");
        }
        return res.json();
    }).catch(err => {
        throw err;
    })
}

export default {getUsers, postUsers};