import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function Register () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const getCSRF = async () => {
            try{
                fetch("http://127.0.0.1:8000/api/csrf/", {
                    credentials: "include"
                });
            } catch (error) {
                console.log("Error fetching CSRF", error);
            }
        };
        getCSRF();
    }, []);

    const SubmitData = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword){
            setMessage("Passwords do not match");
            return;
        }

       
        try{
            const csrftoken = Cookies.get('csrftoken')

            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                credentials: "include",
                headers: {"Content-type":"application/json", "X-CSRFToken": csrftoken},
                body: JSON.stringify({email, password, username, confirmPassword})
            })
            if (!response.ok){
                throw new Error(`API Error creating account: ${response.status} ${response.statusText}`);
            }
            const data = await response.json()
            setMessage(data.message);
        } catch (error){
            throw new Error(`Failed to fetch register endpoint data: ${error.message}`);
        }
    };

    return (
         <form onSubmit={SubmitData}>
            <input type="email" placeholder="Enter your email" value = {email} onChange = {(e) => setEmail(e.target.value)}></input>
            <input type="text" placeholder="Enter your username" value = {username} onChange = {(e) => setUsername(e.target.value)}></input>
            <input type="password" placeholder="Enter your password" value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
            <input type="password" placeholder="Confirm your password" value = {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)}></input>
            <button type="submit">Register</button>

            {message &&
                <p>{message}</p>
            }
        </form>
    );

}

export default Register;