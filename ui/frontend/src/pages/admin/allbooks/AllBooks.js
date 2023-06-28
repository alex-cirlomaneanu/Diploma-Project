import React, {useState} from "react";
import {Button, Form, InputGroup, Table} from "react-bootstrap";
import fetchBooks from "../../../api/fetchdata/books/fetchBooks";
import PaginationBar from "../../../components/general/pagination/Pagination";
import axios from "axios";
import DeleteConfirmationModal from "../../../components/adminmodals/DeleteConfirmationModal";
import EditBookModal from "../../../components/adminmodals/EditBookModal";

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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const [showEditModal, setShowEditModal] = useState(false);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);
    const [bookToEdit, setBookToEdit] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteBookId, setDeleteBookId] = useState(null);


    const handleDelete = (book) => {
        console.log("Delete book: ", book);
        setDeleteBookId(book.bookId);
        setShowDeleteModal(true);
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
        setShowDeleteModal(false);
    }

    const handleCancelDelete = () => {
        setDeleteBookId(null);
        setShowDeleteModal(false);
    }

    function handleEdit(book) {
        handleShowEditModal();
        setBookToEdit(book);
        console.log("Edit book: ", bookToEdit);
    }

    console.log(showEditModal);
    return (
        <div>
            <h1>Toate cărțile</h1>
            <DeleteConfirmationModal
                show={showDeleteModal}
                onDelete={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <EditBookModal
                show={showEditModal}
                book={bookToEdit}
                handleClose={handleCloseEditModal}
            />
            <Button
                variant="primary"
                onClick={() => handleShowEditModal()}
            >
                Adauga carte
            </Button>
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
                    <th>Acțiuni</th>
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
                            </Button>
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