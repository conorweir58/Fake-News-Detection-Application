import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function Register () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [confirm_password, setConfirm] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/csrf/", {
            credentials: "include"
        });
    }, []);

    const SubmitData = (e) => {
        e.preventDefault();

        const csrftoken = Cookies.get('csrftoken')

        fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            credentials: "include",
            headers: {"Content-type":"application/json", "X-CSRFToken": csrftoken},
            body: JSON.stringify({email, password, username, confirm_password})
        })
        .then(res => res.json())
        .then(data => {
            setMessage(data.message);
        })
    }


        
    return (
         <form onSubmit={SubmitData}>
            <input type="text" placeholder="Enter your email" value = {email} onChange = {(e) => setEmail(e.target.value)}></input>
            <input type="text" placeholder="Enter your username" value = {username} onChange = {(e) => setUsername(e.target.value)}></input>
            <input type="text" placeholder="Enter your password" value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
            <input type="text" placeholder="Confirm your password" value = {confirm_password} onChange = {(e) => setConfirm(e.target.value)}></input>
            <button type="submit">Register</button>
            {message &&
                <p>{message}</p>
            }
        </form>
    );

}
export default Register;