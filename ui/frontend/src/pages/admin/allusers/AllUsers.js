import React, {useState} from "react";
import {Button, Table} from "react-bootstrap";
import fetchUsers from "../../../components/fetchdata/fetchUsers";
import getDate from "../../../components/calendardate/calendardate";
import PaginationBar from "../../../components/pagination/pagination";
import axios from "axios";
import DeleteConfirmationModal from "../../../components/modals/DeleteConfirmationModal";

/**
 * This component displays all the users in the database in a table.
 * The app admin can see all the users in the database and perform
 * CRUD operations on them.
 */
const AllUsers = () => {
    const users = fetchUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(2);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState({});

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleDelete = (user) => {
        setShowModal(true);
        setUserToDelete(user);
    }
    const handleConfirmDelete = () => {
        console.log("Delete user: ", userToDelete);
        try {
            async function deleteUser() {
                const url = `http://localhost:8080/api/v1/appuser/deleteuser?userId=${userToDelete.userId}`;
                const response = await axios.delete(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });
                const data = await response;
            }
            deleteUser().then(r => console.log("Delete user response: ", r));
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
    }

    const handleCancelDelete = () => {
        setUserToDelete(null);
        setShowModal(false);
    }

    return (
        <div>
            <h1>Toți utilizatorii</h1>
            <DeleteConfirmationModal
                show={showModal}
                onDelete={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nume</th>
                    <th>Prenume</th>
                    <th>Email</th>
                    <th>Telefon</th>
                    <th>Data nașterii</th>
                    <th>Împrumuturi</th>
                    <th>Acțiuni</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.lastname}</td>
                        <td>{user.firstname}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{getDate(user.birthDate)}</td>
                        <td>{user.rentals.length}</td>
                        <td>
                            <Button variant="primary">Editează</Button>
                            <Button variant="danger" onClick={() => handleDelete(user)}>Șterge</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <PaginationBar
                elements={users}
                elementsPerPage={usersPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}

export default AllUsers;