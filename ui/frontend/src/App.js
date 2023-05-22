import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import WebsiteLayout from './components/layout/websitelayout/WebsiteLayout';
import HomePage from "./pages/homepage/HomePage";
import {AuthProvider} from "./components/auth/auth";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AppUser from "./pages/appuser/AppUser";
import Books from "./pages/books/Books";
import AboutUs from "./pages/aboutus/AboutUs";


function Logout() {
    return null;
}

function About() {
    return null;
}

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<WebsiteLayout><HomePage /></WebsiteLayout>} />
                <Route path="/login" element={<WebsiteLayout><Login /></WebsiteLayout>} />
                <Route path="/register" element={<WebsiteLayout><Register /></WebsiteLayout>} />
                <Route path="/profile" element={<WebsiteLayout><AppUser /></WebsiteLayout>} />
                <Route path="/logout" element={<WebsiteLayout><Logout/></WebsiteLayout>} />
                <Route path="/books" element={<WebsiteLayout><Books /></WebsiteLayout>} />
                <Route path="/about" element={<WebsiteLayout><AboutUs /></WebsiteLayout>} />
                <Route path={'*'} element={<WebsiteLayout><h1>Page not found</h1></WebsiteLayout>} />
            </Routes>
        </AuthProvider>
    );
}

export default App;