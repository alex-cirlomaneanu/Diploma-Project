import React, {useContext} from 'react';
import {Button, Form, Image, Nav, Navbar} from "react-bootstrap";
import {AuthContext} from "../../auth/auth";
import "./Navbar.css";
import Search from "../../search/search";

const NavBar = () => {
    const {authenticated, logout} = useContext(AuthContext);

    return (
           <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <Image src="/logo3.png" width="70.4" height="40" className="d-inline-block align-top" alt="HomeBookExpress logo" />
                    HomeBookExpress
                </Navbar.Brand>
                <Nav className="mr-auto">
                    {
                        authenticated? (
                            <>
                                <Search />
                                <Nav.Link href="/books">Cărți</Nav.Link>
                                <Nav.Link href="/profile" >Profil</Nav.Link>
                                <Nav.Link href="/about">Despre noi</Nav.Link>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/about">Despre noi</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </>
                        )
                    }
                </Nav>
            </Navbar>
    );
}

export default NavBar;