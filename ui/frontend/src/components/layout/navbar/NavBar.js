import React, {useContext} from 'react';
import {NavDropdown, Image, Nav, Navbar} from "react-bootstrap";
import {AuthContext} from "../../auth/Auth";
import "./Navbar.css";
import Search from "../../general/search/Search";

const NavBar = () => {
    const {authenticated, logout, email} = useContext(AuthContext);

    return (
           <Navbar bg="dark" variant="light">
                <Navbar.Brand href="/">
                    <Image src="/logo3.png" width="70.4" height="40" className="d-inline-block align-top" alt="HomeBookExpress logo" />
                    HomeBookExpress
                </Navbar.Brand>
                <Nav className="mr-auto">
                    {
                        authenticated? (
                            <>
                                {localStorage.getItem("userEmail") === "alex@admin.com"? (
                                    <>
                                        <Nav.Link href="/admin">Tabel administrator</Nav.Link>
                                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Search />
                                        <Nav>
                                            <NavDropdown
                                                id={"dropdown-basic-button"}
                                                title={"Cărți"}
                                            >
                                                    <NavDropdown.Item href="/books">Toate cărțile</NavDropdown.Item>
                                                    <NavDropdown.Item href="/books/authors">Cele mai populare cărți</NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                        <Nav.Link href="/profile" >Profil</Nav.Link>
                                        <Nav.Link href="/about">Despre noi</Nav.Link>
                                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                                    </>
                            )}
                           </>
                        ) : (
                            <>
                                <Nav.Link href="/about">Despre noi</Nav.Link>
                                <Nav.Link href="/login">Autentificare</Nav.Link>
                                <Nav.Link href="/register">Înregistrare</Nav.Link>
                            </>
                        )
                    }
                </Nav>
            </Navbar>
    );
}

export default NavBar;