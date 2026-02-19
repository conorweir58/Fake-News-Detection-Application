import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { linkClasses } from '../../styles/tailwindConstants';
import { useAuth } from '../../contexts/AuthContext';

function Logout () {
    const { logout } = useAuth();

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
            logout(); // wipe global auth info
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
        <button onClick={LoggingOut} type="submit" className={`${linkClasses} cursor-pointer`}>Logout</button>
    );

}
export default Logout;