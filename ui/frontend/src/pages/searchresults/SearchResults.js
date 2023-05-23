import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router";
import BookCard from "../../components/bookcards/bookcards";
import {Row} from "react-bootstrap";
import PaginationBar from "../../components/pagination/pagination";

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
        <div>
            <h1>Rezultatele căutării pentru: {term}</h1>
            <div className="book-table">
                <Row>
                    {currentBooks.map((book, index) => (
                        <BookCard book={book} key={index}/>
                    ))}
                </Row>
            </div>
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