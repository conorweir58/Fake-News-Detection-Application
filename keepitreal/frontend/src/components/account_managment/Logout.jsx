import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { linkClasses } from '../../styles/tailwindConstants';

function Logout () {

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
        <button onClick={LoggingOut} type="submit" className={linkClasses}>Logout</button>
    );

}
export default Logout;