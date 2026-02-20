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

        try {
            const csrftoken = Cookies.get("csrftoken");

            const response = await fetch("http://127.0.0.1:8000/api/logout/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CSRFToken": csrftoken,
                },
            });

            if (!response.ok) {
                throw new Error(`Logout failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // Update global auth state AFTER backend confirms logout
            logout();

            console.log("Logout successful:", data.message);

        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    return (
        <button onClick={LoggingOut} type="submit" className={`${linkClasses} cursor-pointer`}>Logout</button>
    );

}
export default Logout;