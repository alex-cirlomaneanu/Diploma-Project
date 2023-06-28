import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import WebsiteLayout from './components/layout/websitelayout/WebsiteLayout';
import HomePage from "./pages/homepage/HomePage";
import {AuthProvider} from "./components/auth/Auth";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Books from "./pages/books/Books";
import AboutUs from "./pages/aboutus/AboutUs";
import BookPage from "./pages/bookpage/BookPage";
import SearchResults from "./pages/searchresults/SearchResults";
import Admin from "./pages/admin/Admin";
import AllAuthors from "./pages/admin/allauthors/AllAuthors";
import AllBooks from "./pages/admin/allbooks/AllBooks";
import AllUsers from "./pages/admin/allusers/AllUsers";
import Genres from "./pages/genres/Genres";
import PopularBooks from "./pages/popular books/PopularBooks";
import Authors from "./pages/authors/Authors";
import GenrePage from "./pages/genrepage/GenrePage";
import AuthorPage from "./pages/authorpage/AuthorPage";
import AllGenres from "./pages/admin/allgenres/AllGenres";


function Logout() {
    return null;
}
function App() {
    return (
        <AuthProvider>
            <Routes>
               <>
                   <Route path="/" element={<WebsiteLayout><HomePage /></WebsiteLayout>} />
                   <Route path="/login" element={<WebsiteLayout><Login /></WebsiteLayout>} />
                   <Route path="/register" element={<WebsiteLayout><Register /></WebsiteLayout>} />
                   <Route path="/profile" element={<WebsiteLayout><Profile /></WebsiteLayout>} />
                   <Route path="/logout" element={<WebsiteLayout><Logout/></WebsiteLayout>} />
                   <Route path="/books" element={<WebsiteLayout><Books /></WebsiteLayout>} />
                   <Route path={"books/:bookId"} element={<WebsiteLayout><BookPage /></WebsiteLayout>} />
                   <Route path="/books/popularbooks" element={<WebsiteLayout><PopularBooks /></WebsiteLayout>} />
                   <Route path="/genres" element={<WebsiteLayout><Genres /></WebsiteLayout>} />
                   <Route path="/genres/:genreName" element={<WebsiteLayout><GenrePage /></WebsiteLayout>} />
                   <Route path="/authors" element={<WebsiteLayout><Authors /></WebsiteLayout>} />
                   <Route path="/authors/:authorName" element={<WebsiteLayout><AuthorPage /></WebsiteLayout>} />
                   <Route path="/about" element={<WebsiteLayout><AboutUs /></WebsiteLayout>} />
                   <Route path="/searchresults/:searchTerm" element={<WebsiteLayout><SearchResults /></WebsiteLayout>} />
                   <Route path="/admin" element={<WebsiteLayout><Admin /></WebsiteLayout>} />
                   <Route path="/admin/allbooks" element={<WebsiteLayout><AllBooks /></WebsiteLayout>} />
                   <Route path="/admin/allusers" element={<WebsiteLayout><AllUsers /></WebsiteLayout>} />
                   <Route path="/admin/allauthors" element={<WebsiteLayout><AllAuthors /></WebsiteLayout>} />
                 <Route path="/admin/allrentals" element={<WebsiteLayout><h1>Împrumuturi</h1></WebsiteLayout>} />
                    <Route path="/admin/allgenres" element={<WebsiteLayout><AllGenres /></WebsiteLayout>} />
                   <Route path={'*'} element={<WebsiteLayout><h1>Page not found</h1></WebsiteLayout>} />
               </>
            </Routes>
        </AuthProvider>
    );
}

export default App;