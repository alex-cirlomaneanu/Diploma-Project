import React, {useState} from "react";
import {Button, Table} from "react-bootstrap";
import fetchAllAuthors from "../../../api/fetchdata/books/fetchAllAuthors";
import PaginationBar from "../../../components/general/pagination/Pagination";
import DeleteConfirmationModal from "../../../components/adminmodals/DeleteConfirmationModal";
import axios from "axios";
import AddAuthorModal from "../../../components/adminmodals/allauthors/AddAuthorModal";
import EditAuthorModal from "../../../components/adminmodals/allauthors/EditAuthorModal";

const AllAuthors = () => {
    const authors1 = fetchAllAuthors();
    const authors = authors1.sort((a, b) => a.authorName.localeCompare(b.authorName));

    const [currentPage, setCurrentPage] = useState(1);
    const [authorsPerPage] = useState(10);

    const indexOfLastAuthor = currentPage * authorsPerPage;
    const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
    const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [authorToDelete, setAuthorToDelete] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [authorToEdit, setAuthorToEdit] = useState({});

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleDelete = (author) => {
        setShowDeleteModal(true);
        setAuthorToDelete(author);
    }

    const handleConfirmDelete = async () => {
        try {
            const url = `http://localhost:8080/api/v1/authors/deleteauthor?authorName=${authorToDelete.authorName}`;
            const response = await axios.delete(
                url,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
            console.log(response);
            setShowDeleteModal(false);
            setAuthorToDelete(null);
        } catch (e) {
            console.log(e);
        }
    }

    const handleCancelDelete = () => {
        setAuthorToDelete(null);
        setShowDeleteModal(false);
    }

    const handleAdd = () => {
        setShowAddModal(true);
    }

    const handleCancelAdd = () => {
        setShowAddModal(false);
    }

    function handleEdit(author) {
        setShowEditModal(true);
        setAuthorToEdit(author);
    }

    const handleCancelEdit = () => {
        setShowEditModal(false);
        setAuthorToEdit({});
    }

    return (
        <div className="container">
            <h1>Toti Autorii</h1>
            <Button varaint="primary" onClick={() => handleAdd()}>Adauga autor</Button>
            <Table striped bordered hover>
                <tbody>
                <tr>
                    <th>#</th>
                    <th>ID autor</th>
                    <th>Nume complet</th>
                    <th>Acțiune</th>
                </tr>
                {currentAuthors.map((author, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{author.authorId}</td>
                        <td>{author.authorName}</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDelete(author)}>Șterge</Button>
                            <Button variant="warning" onClick={() => handleEdit(author)}>Editează</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <PaginationBar
                elements={authors}
                elementsPerPage={authorsPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
            <DeleteConfirmationModal
                show={showDeleteModal}
                onDelete={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <AddAuthorModal
                show={showAddModal}
                onCancel={handleCancelAdd}
                />
            <EditAuthorModal
                show={showEditModal}
                onCancel={handleCancelEdit}
                author={authorToEdit}
            />
        </div>
    )
}

export default AllAuthors;