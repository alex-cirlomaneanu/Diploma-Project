import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../components/auth/auth";
import {Col, Card, Pagination, Row, PageItem} from "react-bootstrap";
import {useParams} from "react-router";

const BookPage = () => {
    const params = useParams();
    const [book, setBook] = useState([]);
    const authContext = useContext(AuthContext)

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
            <h1>{book.title}</h1>
        </div>
    );
}

export default BookPage;