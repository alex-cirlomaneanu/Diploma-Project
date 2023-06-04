import React, {useState, useEffect, useContext} from "react";
import "./HomePage.css";
import axios from "axios";
import {AuthContext} from "../../components/auth/Auth";
import {Image} from "react-bootstrap";
import BookCarousel from "../../components/bookcarousel/BookCarousel";
import fetchPopularBooks from "../../components/fetchdata/fetchPopularBooks";

const HomePage = () => {
    const userEmail = localStorage.getItem('userEmail');
    const [firstname, setFirstname] = React.useState('');
    const authContext = useContext(AuthContext);
    const books =  fetchPopularBooks();


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
                setFirstname(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        if (authContext.authenticated) {
            let data = fetchData().then(() => console.log(data));
        }
    });

    function Greeting() {
        if (authContext.authenticated) {
            return (
                <div>
                    <h1 className="greeting">Bine ai revenit, {firstname}</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="greeting">Bine ai venit</h1>
                </div>
            )
        }
    }

    function Explore() {
        if (authContext.authenticated) {
            return (
                <div className="explore">
                    <a href={"/books"}>
                        <h3>Nu te-ai hotărât? Explorează cărțile aici</h3>
                        <img src="/explore.png" alt={"explore"} />
                    </a>
                </div>
            )
        } else {
            return (
                <div className="explore">
                    <a href={"/login"}>
                        <h3>Nu te-ai hotărât? Explorează cărțile aici</h3>
                        <img src="/explore.png" alt={"explore"} />
                    </a>
                </div>
            )
        }
    }

    return (
        <div className="home-page">
            <div className="bookshelf">
                <Image src="/top-view-books-arrangement.jpg" alt={"bookshelf"} fluid/>
            </div>
            <div className="info-div">
                <br/>
                <>{Greeting()}</>
                <br/>
                <p className="description">Aici vei gasi o multime de carti, de la cele mai cunoscute pana la cele
                    mai noi.</p>
                <p className="description">Intra in contul tau sau creeaza-ti unul pentru a putea comanda cartile
                    dorite.</p>
                <p className="description">Daca nu stii ce sa citesti, poti sa arunci o privire la cartile
                    recomandate.</p>
                <p className={"description"}><Image className={"logo"} src="/logo3.jpg" alt={"logo"}/></p>
                <p className={"description"}> Cartile populare </p>
                <div className="popular-books">
                    <BookCarousel books={books}/>
                </div>
            </div>
            <>{Explore()}</>
        </div>
    );
};

export default HomePage;