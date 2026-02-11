import { useEffect, useState } from 'react';

// Custom hook to check if user is authenticated and receive some basic user info

function useAuth () {

    const [isAuth, setIsAuth] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/check-auth/`, {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
                console.log("API Response:", data);
                setIsAuth(data.authenticated);
                setEmail(data.email);
                setUsername(data.username);
            })
            .catch(error => console.error("Auth check failure:", error))
  }, []);

    return {isAuth, email, username};
}

export default useAuth;