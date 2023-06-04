import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router";
import BookCard from "../../components/bookcards/BookCards";
import {Row} from "react-bootstrap";
import PaginationBar from "../../components/pagination/Pagination"

const SearchResults = () => {
    const location = useLocation();
    const [books, setBooks] = useState(location.state.books);
    const [term, setTerm] = useState(location.state.term);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastBook = currentPage * 12;
    const indexOfFirstBook = indexOfLastBook - 12;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        setBooks(location.state.books);
        setTerm(location.state.term);
    }, [location]);
    
    return (
        <div  className="book-table">
            <h1 className="book-results">Rezultatele căutării pentru: {term}</h1>
            {
                books.length === 0 ? (
                    <h3>Nu s-au găsit cărți</h3>
                ) : (
                        <Row>
                            {currentBooks.map((book, index) => (
                                <BookCard book={book} key={index}/>
                            ))}
                        </Row>
                )
            }
            <br/>
            <PaginationBar
                elementsPerPage={12}
                elements={books}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default SearchResults;