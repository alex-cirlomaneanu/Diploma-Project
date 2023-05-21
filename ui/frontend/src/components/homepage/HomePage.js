import React, {useState, useEffect, useContext} from "react";
import "./HomePage.css";
import axios from "axios";
import {AuthContext} from "../../utils/auth";
import {Image} from "react-bootstrap";

const HomePage = () => {
    const userEmail = localStorage.getItem('userEmail');
    const [firstname, setFirstname] = React.useState('');
    const authContext = useContext(AuthContext);
    console.log(authContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "http://localhost:8080/api/v1/appuser/getusernamebyuseremail";
                const response = await axios.get(url,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token')
                        },
                        params: {userEmail}
                    });
                console.log(response.data);
                setFirstname(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData().then(r => console.log(r));
    });

    function Greeting() {
        if (authContext.authenticated) {
            return <h1 className="greeting">Bine ai revenit, {firstname}</h1>
        } else {
            return <h1 className="greeting">Bine ai venit</h1>
        }
    }

    return (
        <div className={"home-page"}>
            <Image className={"bookshelf"} src="/bookshelf.jpg" alt={"bookshelf"} fluid/>
            <>{Greeting()}</>
        </div>
    );
};

export default HomePage;