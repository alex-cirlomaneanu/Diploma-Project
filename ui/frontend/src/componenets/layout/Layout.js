import React from "react";
import NavBar from "../Navbar/NavBar";
import Footer from "../footer/Footer";
import {Outlet} from "react-router";

const Layout = (props) => {
    return (
        <React.Fragment>
            <NavBar/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </React.Fragment>
    );
};

export default Layout;