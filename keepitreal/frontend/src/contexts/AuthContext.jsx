// based on https://medium.com/@didemsahin1789/building-secure-authentication-with-react-context-in-react-native-3a55f27346fa

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

// Create React Context for Authentication handling so that it can be accessed in all component trees - will allow auth status to be accessed and updated globally

export function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true); // use loading to prevent unnecessary loading of a false page before we get the auth

    const checkAuth = () => {
        fetch(`http://127.0.0.1:8000/api/check-auth/`, {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
                // Get + Store Auth data from backend
                setIsAuth(data.authenticated);
                setUsername(data.username);
            })
            .catch(() => {
                // Set to unauthenticated on error
                setIsAuth(false);
                setUsername("");
            })
            .finally(() => {
                // set loading to false
                setLoading(false)
            });
    };

    useEffect(() => {
        checkAuth();
    }, []);

    // Lets this be used in Login.jsx to update auth globally after successful login in the backend - whole login logic could potentially be moved here
    const login = (username) => {
        setIsAuth(true);
        setUsername(username);
    };

    // Similarly lets the user details be wiped globally after successful logout
    const logout = () => {
        setIsAuth(false);
        setUsername(username);
    };

    return (
        <AuthContext.Provider value={{ isAuth, username, loading, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

// from https://medium.com/@didemsahin1789/building-secure-authentication-with-react-context-in-react-native-3a55f27346fa
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};