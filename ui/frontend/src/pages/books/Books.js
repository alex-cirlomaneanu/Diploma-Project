import React, {useState, useContext} from "react";
import fetchBooks from "../../components/fetchdata/fetchBooks";
import {AuthContext} from "../../components/auth/auth";
import {Col, Card, Row} from "react-bootstrap";
import PaginationBar from "../../components/pagination/pagination";
import "./Books.css";
import {Link} from "react-router-dom";
import BookFilter from "../../components/filter/BookFilter";
import BookCard from "../../components/bookcards/bookcards";

/**
 * This component displays all the books in the database.
 * @returns {JSX.Element}
 * @constructor
 */
const Books = () => {
    const books = fetchBooks();
    const authContext = useContext(AuthContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(12);

    if (!authContext.authenticated) {
        authContext.navigate("/login");
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    return (
        <div className="book-table">
            <h1>Cărțile disponibile</h1>
            <BookFilter books={books} />
            <Row className={"d-flex"}>
                <Row>
                    {currentBooks.map((book, index) => (
                        <BookCard book={book} key={index}/>
                    ))}
                </Row>
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