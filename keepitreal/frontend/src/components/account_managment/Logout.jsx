import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

function Logout () {

    const [message, setMessage] = useState("");

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

    const LoggingOut = async (e) => {
        e.preventDefault();

        const csrftoken = Cookies.get('csrftoken')

        fetch("http://127.0.0.1:8000/api/logout/", {
            method: "POST",
            credentials: "include",
            headers: {"X-CSRFToken": csrftoken},
        })
        .then(res => res.json())
        .then(data => {
            setMessage("Logged Out", data);
        })
        try{
            const csrftoken = Cookies.get('csrftoken')

            const response = await fetch("http://127.0.0.1:8000/api/logout/", {
                method: "POST",
                credentials: "include",
                headers: {"X-CSRFToken": csrftoken},
            })
            if (!response.ok){
                throw new Error(`API Error logging out of account: ${response.status} ${response.statusText}`);
            }
            const data = await response.json()
            setMessage(data.message);
        } catch (error){
            throw new Error(`Failed to fetch logout endpoint data: ${error.message}`);
        }
    }
    return (
         <form onSubmit={LoggingOut}>
            <button type="submit">Logout</button>

            {message &&
                <p>{message}</p>
            }
        </form>
    );

}
export default Logout;