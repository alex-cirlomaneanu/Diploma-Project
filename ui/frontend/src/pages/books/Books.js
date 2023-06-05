import React, {useState, useContext} from "react";
import fetchBooks from "../../api/fetchdata/fetchBooks";
import {AuthContext} from "../../components/auth/Auth";
import {Row} from "react-bootstrap";
import PaginationBar from "../../components/pagination/Pagination";
import "./Books.css";
import BookCard from "../../components/bookcards/BookCards";

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
            <h1  className="book-results">Cărțile disponibile</h1>
            <Row className={"d-flex"}>
                {/*<Row>*/}
                    {currentBooks.map((book, index) => (
                        <BookCard book={book} key={index}/>
                    ))}
                {/*</Row>*/}
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