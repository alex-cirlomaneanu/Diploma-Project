import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WebsiteLayout from './components/layout/websitelayout/WebsiteLayout';
import HomePage from './components/homepage/HomePage';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Logout from './components/auth/logout/Logout';
import { AuthProvider } from './utils/auth';

import './App.css';
import AppUser from "./components/appuser/AppUser";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<WebsiteLayout><HomePage /></WebsiteLayout>} />
                <Route path="/login" element={<WebsiteLayout><Login /></WebsiteLayout>} />
                <Route path="/register" element={<WebsiteLayout><Register /></WebsiteLayout>} />
                <Route path="/profile" element={<WebsiteLayout><AppUser /></WebsiteLayout>} />
                <Route path="/logout" element={<WebsiteLayout><Logout/></WebsiteLayout>} />
                <Route path={'*'} element={<WebsiteLayout><h1>Page not found</h1></WebsiteLayout>} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
