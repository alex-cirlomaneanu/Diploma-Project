import React from 'react';
import {NavLink, Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <h1>HomeBookExpress</h1>
            <div>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/appuser">AppUser</NavLink>
                <NavLink to="/book">Book</NavLink>
                <NavLink to="/bookrequest">BookRequest</NavLink>
                <NavLink to="/bookrequeststatus">BookRequestStatus</NavLink>
                <NavLink to="/bookstatus">BookStatus</NavLink>
                <NavLink to="/booktype">BookType</NavLink>
                <NavLink to="/genre">Genre</NavLink>
                <NavLink to="/publisher">Publisher</NavLink>
                <NavLink to="/rating">Rating</NavLink>
                <NavLink to="/review">Review</NavLink>
                <NavLink to="/wishlist">Wishlist</NavLink>
            </div>
        </div>
    );
}

export default Header;