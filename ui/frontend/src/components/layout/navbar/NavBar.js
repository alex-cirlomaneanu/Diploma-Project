import React, {useContext} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {AuthContext} from "../../../utils/auth";
import "./Navbar.css";
import Logout from "../../auth/logout/Logout";

const NavBar = () => {
    const {authenticated, logout} = useContext(AuthContext);

    return (
           <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">HomeBookExpress</Navbar.Brand>
                <Nav className="mr-auto">
                    {
                        authenticated? (
                            <>
                                <Nav.Link href="/profile" >Profil</Nav.Link>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
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