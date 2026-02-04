import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/csrf/", {
            credentials: "include"
        });
    }, []);

    const SubmitData = (e) => {
        e.preventDefault();

        const csrftoken = Cookies.get('csrftoken')

        fetch("http://127.0.0.1:8000/api/login/", {
            method: "POST",
            credentials: "include",
            headers: {"Content-type":"application/json", "X-CSRFToken": csrftoken},
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
        .then(data => {
            setMessage(data.message);
        })
    }
    
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