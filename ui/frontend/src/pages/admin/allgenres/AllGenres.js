import React, {useState} from "react";
import {Button, Col, Table} from "react-bootstrap";
import fetchGenres from "../../../api/fetchdata/fetchAllGenres";
import PaginationBar from "../../../components/general/pagination/Pagination";
import axios from "axios";
import DeleteConfirmationModal from "../../../components/adminmodals/DeleteConfirmationModal";
import AddGenreModal from "../../../components/adminmodals/allgenres/AddGenreModal";
import EditGenreModal from "../../../components/adminmodals/allgenres/EditGenreModal";



const AllGenres = () => {
    const genres1 = fetchGenres();
    const genres = genres1.sort((a, b) => a.genreName.localeCompare(b.genreName));
    const [currentPage, setCurrentPage] = useState(1);
    const [genresPerPage] = useState(10);

    const indexOfLastGenre = currentPage * genresPerPage;
    const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
    const currentGenres = genres.slice(indexOfFirstGenre, indexOfLastGenre);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [genreToDelete, setGenreToDelete] = useState({});

    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [genreToEdit, setGenreToEdit] = useState({});

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleDelete = (genre) => {
        setShowDeleteModal(true);
        setGenreToDelete(genre);
    }

    const handleConfirmDelete = async () => {
        try {
            const url = `http://localhost:8080/api/v1/bookgenre/deletebookgenre?bookGenreName=${genreToDelete.genreName}`;
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
            setGenreToDelete(null);
        } catch (e) {
            console.log(e);
        }
    }

    const handleCancelDelete = () => {
        setGenreToDelete(null);
        setShowDeleteModal(false);
    }

    const handleAdd = () => {
        setShowAddModal(true);
    }

    const handleCancelAdd = () => {
        setShowAddModal(false);
    }

    const handleEdit = (genre) => {
        setShowEditModal(true);
        setGenreToEdit(genre);
    }

    const handleCancelEdit = () => {
        setShowEditModal(false);
        setGenreToDelete({});
    }

    return (
        <div>
            <h1>Genuri</h1>
            <Button variant="primary" onClick={() => handleAdd()}>Adaugă gen</Button>
            <Table striped bordered hover>
                <tbody>
                <tr>
                    <th scope={"col"}>#</th>
                    <th scope={"col"}>ID gen</th>
                    <th scope={"col"}>Denumire</th>
                    <th scope={"col"}>Acțiuni</th>
                </tr>
                {currentGenres.map((genre, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{genre.genreId}</td>
                        <td>{genre.genreName}</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDelete(genre)}>Șterge</Button>
                            <Button variant="warning" onClick={() => handleEdit(genre)}>Editează</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <PaginationBar
                elements={genres}
                elementsPerPage={genresPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
            <DeleteConfirmationModal
                show={showDeleteModal}
                onDelete={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <AddGenreModal
                show={showAddModal}
                onCancel={handleCancelAdd}
            />
            <EditGenreModal
                show={showEditModal}
                onCancel={handleCancelEdit}
                genre={genreToEdit}
            />
        </div>
    )
}

export default AllGenres;
