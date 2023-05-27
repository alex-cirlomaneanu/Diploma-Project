import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../components/auth/auth";
import {Col, Card, Pagination, Row, PageItem} from "react-bootstrap";
import {useParams} from "react-router";
import "./BookPage.css";

const BookPage = () => {
    const params = useParams();
    const [book, setBook] = useState([]);
    const authContext = useContext(AuthContext)
    const authorName = book.author != null ? book.author.authorName : "";
    const bookGenres = Array.isArray(book.bookGenres)
        ? book.bookGenres.map(genre => genre.genreName).join(", ")
        : "";

    console.log(bookGenres);
    if (!authContext.authenticated) {
        authContext.navigate("/login");
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const url = `http://localhost:8080/api/v1/book/getbookbyid/{bookId}?bookId=${params.bookId}`;
                const response = await axios.get(url,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token')
                        }
                    })
                setBook(response.data);
                if (book.bookImage === null) {
                    book.bookImage = "/book-cover.jpg";
                }
            } catch (error) {
                console.error(error);
            }
        }
        let r = fetchData();
    }, []);

    return (
        <div className="book-page">
            <div className="parent">
                <div className="div1">
                    <Card className="book-image">
                        <Card.Body>
                            {/*<div className="book-image">*/}
                                {book.bookImage === null ? (
                                    <img src="/book-cover.jpg"  alt={book.title}/>
                                ) : (
                                    <img src={book.bookImage}  alt={book.title}/>
                                )}
                            {/*</div>*/}
                            <Card.Text>
                                {book.availableCopies != 0 ? "Cartea este disponibilă" : "Cartea nu este disponibilă"
                                }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="div2">
                    <Card  className={"book-details"}>
                        <Card.Header>
                            <Card.Title>{book.title}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Detalii</Card.Title>
                            <br/>
                            <Card.Text>
                                <p>Autor: <b>{authorName}</b></p>
                                <br/>
                                <p>Genuri: {
                                    book.bookGenres && (
                                        <ul>
                                            {book.bookGenres.map(genre => (
                                                <li key={genre.genreId}><b>{genre.genreName}</b></li>
                                            ))}
                                        </ul>
                                    )
                                }</p>
                                <br/>
                                {(book.rentals != null && book.rentals.length > 0) ? (
                                    <>
                                        {book.rentals.length === 1 ? (
                                            <p>Cartea a fost împrumutată o singură dată</p>
                                        ) : (
                                            <p>Cartea a fost împrumutată de {book.rentals.length} ori</p>
                                        )}
                                    </>
                                ) : (
                                    <p>Cartea nu a fost împrumutată încă</p>
                                )}
                                <Card.Text>

                                    {
                                        book.availableCopies != 0 ? <button className="btn btn-primary">Împrumută</button> : ""
                                    }
                                </Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="div3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Recomandări</Card.Title>
                            <Card.Text>
                                <p>Recomandări</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default BookPage;