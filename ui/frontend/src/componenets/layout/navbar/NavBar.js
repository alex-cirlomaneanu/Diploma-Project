import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import "./Navbar.css";

const NavBar = () => {
    return (
           <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">HomeBookExpress</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </Navbar>
    );
}

export default NavBar;