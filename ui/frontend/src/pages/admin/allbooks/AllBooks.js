import React, {useState} from "react";
import {Button, Form, InputGroup, Table} from "react-bootstrap";
import fetchBooks from "../../../components/fetchdata/fetchBooks";
import PaginationBar from "../../../components/pagination/Pagination";
import axios from "axios";
import DeleteConfirmationModal from "../../../components/modals/DeleteConfirmationModal";

/**
 * This component displays all the books in the database in a table.
 * The app admin can see all the books in the database and perform
 * CRUD operations on them.
 * @returns {JSX.Element}
 * @constructor
 */
const AllBooks = () => {
    const books = fetchBooks();
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(12);
    const [searchTerm, setSearchTerm] = useState("");

    const handleReset = async () => {
        setSearchTerm("");
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const handleEdit = (book) => {
        console.log("Edit book: ", book);
        async function editBook() {
            const response = await axios.put(`http://localhost:8080/api/v1/books/updatebook`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(book),
            });
            const data = await response.json();
            console.log("Edit book response: ", data);
        }
        editBook().then(r => console.log("Edit book response: ", r));
    }


    const [showModal, setShowModal] = useState(false);
    const [deleteBookId, setDeleteBookId] = useState(null);

    const handleDelete = (book) => {
        console.log("Delete book: ", book);
        setDeleteBookId(book.bookId);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        try {
            async function deleteBook() {
                const url = `http://localhost:8080/api/v1/book/deletebook?bookId=${deleteBookId}`;
                const response = await axios.delete(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });
                const data = await response;
                console.log("Delete book response: ", data);
            }
            deleteBook().then(r => console.log("Delete book response: ", r));
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
    }

    const handleCancelDelete = () => {
        setDeleteBookId(null);
        setShowModal(false);
    }

    return (
        <div>
            <h1>Toate cărțile</h1>
            <DeleteConfirmationModal
                show={showModal}
                onDelete={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            <Form onSubmit className="mb-3">
                <InputGroup>
                    <Form.Control
                        type="search"
                        placeholder="Caută o carte"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <Button variant="outline-primary" type="submit">
                        Caută
                    </Button>
                    <Button variant="outline-secondary" onClick={handleReset} >
                        Reset
                    </Button>
                </InputGroup>
            </Form>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Titlu</th>
                    <th>Autor</th>
                    <th>Genuri</th>
                    <th>Exemplare disponibile</th>
                    <th>Exemplare totale</th>
                    <th>Imprumuturi</th>
                </tr>
                </thead>
                <tbody>
                {currentBooks.map((book, index) => (
                    <tr key={index}>
                        <td>{book.bookId}</td>
                        <td>{book.title}</td>
                        <td>{book.author.authorName}</td>
                        <td>{book.bookGenres.map((genre, index) => (
                            <span key={index}>{genre.genreName} </span>
                        ))}</td>
                        <td>{books.availableCopies}</td>
                        <td>{book.totalCopies}</td>
                        <td>{book.rentals.length}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleEdit(book)}>
                                Editare
                            </Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(book)}>
                                Ștergere
                            </Button>
                        </td>
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

export default AllBooks;