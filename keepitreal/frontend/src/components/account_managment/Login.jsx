import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { login } = useAuth();
    

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/csrf/", {
            credentials: "include"
        });
    }, []);

    const SubmitData = async (e) => {
        e.preventDefault();
       
        try{
            const csrftoken = Cookies.get('csrftoken')

            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                credentials: "include",
                headers: {"Content-type":"application/json", "X-CSRFToken": csrftoken},
                body: JSON.stringify({email, password})
            })
            if (!response.ok){
                throw new Error(`API Error logging into account: ${response.status} ${response.statusText}`);
            }
            const data = await response.json()
            if(data.authenticated === "true") {
                login(data.username); // update global isAuth and auth username
            }
            setMessage(data.message);
        } catch (error){
            throw new Error(`Failed to fetch login endpoint data: ${error.message}`);
        }
    };
    
    return (
         <form onSubmit={SubmitData}>
            <input type="email" placeholder="Enter your email" value={email} onChange = {(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter your password" value={password} onChange = {(e) => setPassword(e.target.value)}></input>
            <button type="submit">Login</button>

            {message &&
                <p>{message}</p>
            }
        </form>
    );
}

export default Login;