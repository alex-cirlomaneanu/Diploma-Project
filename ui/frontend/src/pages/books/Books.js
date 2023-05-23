import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../components/auth/auth";
import {Col, Card, Pagination, Row, PageItem} from "react-bootstrap";
import PaginationBar from "../../components/pagination/pagination";
import "./Books.css";
import {Link} from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);
    const authContext = useContext(AuthContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(12);

    if (!authContext.authenticated) {
        authContext.navigate("/login");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/book/getallbooks",
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token')
                        }
                    });
                setBooks(response.data);
            } catch (error) {
                console.error(error);
            }
        }
            fetchData().then(r => console.log(r));
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    return (
        <div className="book-table">
            <h1>Cărțile disponibile</h1>
            <Row>
            {currentBooks.map((book, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                    <Link className={"text-decoration-none"} to={`/books/${book.bookId}`}>
                    <Card className="book-card">
                        {book.bookImage === null ? (
                            <Card.Img variant="top" src="/book-cover.jpg" />
                            ) : (
                                <Card.Img variant="top" src={book.image} />
                        )}
                        <Card.Body>
                            <Card.Title className={"text-danger"}>{book.title}</Card.Title>
                            <Card.Text>
                                <p>Autor: {book.author.authorName}</p>
                                <p>Număr cărți disponibile: {book.availableCopies}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
            ))}
            </Row>
            <PaginationBar
                elementsPerPage={booksPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                elements={books}
            />
        </div>
    );
}

export default Books;