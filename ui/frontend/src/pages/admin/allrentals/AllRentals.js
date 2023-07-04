import React, {useState} from "react";
import {Button, Form, InputGroup, Table} from "react-bootstrap";
import PaginationBar from "../../../components/general/pagination/Pagination";
import fetchAllRentals from "../../../api/fetchdata/fetchAllRentals";
import books from "../../books/Books";
import getDate from "../../../api/calendardate/calendardate";

/**
 * This component displays all the books in the database in a table.
 * The app admin can see all the books in the database and perform
 * CRUD operations on them.
 * @returns {JSX.Element}
 * @constructor
 */
const AllRentals = () => {
    const rentals1 = fetchAllRentals();
    const rentals = rentals1.sort((a, b) => (a.status < b.status) ? 1 : -1);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(12);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = rentals.slice(indexOfFirstBook, indexOfLastBook);

    return (
        <div>
            <h1>Toate cărțile</h1>
            <Table striped bordered hover>
                <tbody>
                <tr>
                    <th>#</th>
                    <th>Utilizator</th>
                    <th>Carte</th>
                    <th>Data împrumut</th>
                    <th>Data returnare</th>
                    <th>Returnată</th>
                </tr>
                {currentBooks.map((rental, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{rental.userEmail}</td>
                        <td>{rental.title}</td>
                        <td>{getDate(rental.rentalDate)}</td>
                        <td>{getDate(rental.returnDate)}</td>
                        <td>{rental.status ? "Nereturnata" : "Returnata"
                        }</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <PaginationBar
                elementsPerPage={booksPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                elements={books}
            />
        </div>
    );
}

export default AllRentals;