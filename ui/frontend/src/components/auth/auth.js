import { createContext, useState, useEffect } from 'react';
import axios from "axios";
import {useNavigate} from "react-router";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    const login = (email) => {
        // Perform authentication logic, e.g., validate credentials
        // If authentication is successful, set authenticated state to true
        // I want to use Login.js to perform authentication logic
        setAuthenticated(true);
        setUserEmail(email);
    };

    const logout = async () => {
        // Perform logout logic, e.g., clear session, remove tokens
        // Set authenticated state to false
        try {
            await axios.post('http://localhost:8080/api/v1/auth/logout',
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
            localStorage.removeItem('token');
            setUserEmail("");
            navigate('/');
        } catch (error) {
            console.error(error);
        }
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout, setUserEmail, userEmail, navigate }}>
            {children}
        </AuthContext.Provider>
    );
};
