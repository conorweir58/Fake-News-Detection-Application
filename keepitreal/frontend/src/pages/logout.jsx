import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

function Logout () {

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/csrf/", {
            credentials: "include"
        });
    }, []);

    const LoggingOut = (e) => {
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