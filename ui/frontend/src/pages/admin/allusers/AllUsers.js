import React, {useState} from "react";
import {Button, Table} from "react-bootstrap";
import fetchUsers from "../../../api/fetchdata/appuser/fetchUsers";
import getDate from "../../../api/calendardate/calendardate";
import PaginationBar from "../../../components/general/pagination/Pagination";
import axios from "axios";
import DeleteConfirmationModal from "../../../components/adminmodals/DeleteConfirmationModal";
import EditProfileModal from "../../../components/profilepage/editprofilemodal/EditProfileModal";

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

    const handleEdit = (user) => {
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
            <EditProfileModal
                show={showModal}
                user={userToDelete}
                handleClose={handleCancelDelete}
            />
            <Table striped bordered hover>

                <tbody>
                <tr>
                    <th>#</th>
                    <th>Nume</th>
                    <th>Prenume</th>
                    <th>Email</th>
                    {/*<th>Parola</th>*/}
                    <th>Telefon</th>
                    <th>Adresa</th>
                    <th>Card</th>
                    <th>Data nașterii</th>
                    <th>Împrumuturi</th>
                    <th>Acțiuni</th>
                </tr>
                {currentUsers.map((user, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.lastname}</td>
                        <td>{user.firstname}</td>
                        <td>{user.email}</td>
                        {/*<td>{user.password}</td>*/}
                        <td>{user.phoneNumber}</td>
                        <td>{user.address}</td>
                        <td>{user.bankAccount}</td>
                        <td>{getDate(user.birthDate)}</td>
                        <td>{user.rentals.length}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleEdit(user)}>Editează</Button>
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