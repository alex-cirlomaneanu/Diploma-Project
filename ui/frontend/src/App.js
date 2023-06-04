import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import WebsiteLayout from './components/layout/websitelayout/WebsiteLayout';
import HomePage from "./pages/homepage/HomePage";
import {AuthProvider} from "./components/auth/Auth";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AppUser from "./pages/appuser/AppUser";
import Books from "./pages/books/Books";
import AboutUs from "./pages/aboutus/AboutUs";
import BookPage from "./pages/bookpage/BookPage";
import SearchResults from "./pages/searchresults/SearchResults";
import Admin from "./pages/admin/Admin";
import AllBooks from "./pages/admin/allbooks/AllBooks";
import AllUsers from "./pages/admin/allusers/AllUsers";


function Logout() {
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
                <Route path={"books/:bookId"} element={<WebsiteLayout><BookPage /></WebsiteLayout>} />
                <Route path="/about" element={<WebsiteLayout><AboutUs /></WebsiteLayout>} />
                <Route path="/searchresults/:searchTerm" element={<WebsiteLayout><SearchResults /></WebsiteLayout>} />
                <Route path="/admin" element={<WebsiteLayout><Admin /></WebsiteLayout>} />
                <Route path="/admin/allbooks" element={<WebsiteLayout><AllBooks /></WebsiteLayout>} />
                <Route path="/admin/allusers" element={<WebsiteLayout><AllUsers /></WebsiteLayout>} />
                <Route path={'*'} element={<WebsiteLayout><h1>Page not found</h1></WebsiteLayout>} />
            </Routes>
        </AuthProvider>
    );
}

export default App;