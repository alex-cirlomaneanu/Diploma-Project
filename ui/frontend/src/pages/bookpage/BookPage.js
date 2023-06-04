import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../components/auth/Auth";
import {Col, Card, Pagination, Row, PageItem} from "react-bootstrap";
import {useParams} from "react-router";
import "./BookPage.css";
import handleRental from "../../components/rental/RentBook";
import getEmail from "../../components/fetchdata/getEmail";
import BookPageImage from "../../components/bookpageimage/BookPageImage";
import BookPageDetails from "../../components/bookpagedetails/BookPageDetails";

const BookPage = () => {
    const params = useParams();
    const [book, setBook] = useState([]);
    const authContext = useContext(AuthContext)
    const authorName = book.author != null ? book.author.authorName : "";
    const bookGenres = Array.isArray(book.bookGenres)
        ? book.bookGenres.map(genre => genre.genreName).join(", ")
        : "";
    const userEmail = getEmail(localStorage.getItem('token'));

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
        <div>
            <div className="book-page">
                <BookPageImage book={book}/>
                <BookPageDetails book={book} userEmail={userEmail} handleRental={handleRental}/>
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