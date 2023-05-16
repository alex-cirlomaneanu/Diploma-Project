import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    const login = () => {
        // Perform authentication logic, e.g., validate credentials
        // If authentication is successful, set authenticated state to true
        // I want to use Login.js to perform authentication logic
        setAuthenticated(true);
    };

    const logout = () => {
        // Perform logout logic, e.g., clear session, remove tokens
        // Set authenticated state to false
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout, setUserEmail, userEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
