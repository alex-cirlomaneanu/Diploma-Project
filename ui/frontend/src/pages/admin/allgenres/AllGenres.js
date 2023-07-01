import React, {useState} from "react";
import {Button, Table} from "react-bootstrap";
import fetchGenres from "../../../api/fetchdata/fetchAllGenres";
import getDate from "../../../api/calendardate/calendardate";
import PaginationBar from "../../../components/general/pagination/Pagination";
import axios from "axios";
import DeleteConfirmationModal from "../../../components/adminmodals/DeleteConfirmationModal";
import AddGenreModal from "../../../components/adminmodals/AddGenreModal";



const AllGenres = () => {
    const genres = fetchGenres();
    const [currentPage, setCurrentPage] = useState(1);
    const [genresPerPage] = useState(10);

    const indexOfLastGenre = currentPage * genresPerPage;
    const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
    const currentGenres = genres.slice(indexOfFirstGenre, indexOfLastGenre);
    const [showModal, setShowModal] = useState(false);
    const [genreToDelete, setGenreToDelete] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleDelete = (genre) => {
        setShowModal(true);
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
            setShowModal(false);
            setGenreToDelete(null);
        } catch (e) {
            console.log(e);
        }
    }

    const handleCancelDelete = () => {
        setGenreToDelete(null);
        setShowModal(false);
    }

    const handleAdd = () => {
        setShowAddModal(true);
    }

    return (
        <div>
            <h1>Genuri</h1>
            <Button variant="primary" onClick={() => handleAdd()}>Adaugă gen</Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>ID gen</th>
                    <th>Denumire</th>
                    <th>Acțiuni</th>
                </tr>
                </thead>
                <tbody>
                {currentGenres.map((genre, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{genre.genreId}</td>
                        <td>{genre.genreName}</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDelete(genre)}>Șterge</Button>
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
                show={showModal}
                onDelete={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <AddGenreModal
                show={showAddModal}
                onCancel={handleCancelDelete}
            />
        </div>
    )
}

export default AllGenres;
