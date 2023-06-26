import React, {useEffect, useState} from "react";
import { Table, Button, Modal} from "react-bootstrap";
import getUserRentals from "../../../api/fetchdata/appuser/getUserRentals";
import PaginationBar from "../../general/pagination/Pagination";
import "./UserRentals.css";
import getDate from "../../../api/calendardate/calendardate";
import axios from "axios";

const UserRentals = ({ show, handleClose, userId} ) => {
    const rentals = getUserRentals(userId);
    const [currentPage, setCurrentPage] = useState(1);
    const [rentalsPerPage] = useState(7);
    const indexOfLastRental = currentPage * rentalsPerPage;
    const indexOfFirstRental = indexOfLastRental - rentalsPerPage;
    const currentRentals = rentals.slice(indexOfFirstRental, indexOfLastRental);
    const [isOperationSuccessful, setIsOperationSuccessful] = useState(false);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        if (isOperationSuccessful) {
            window.location.reload();
        }
    }, [isOperationSuccessful]);
    
    const handleReturn = async (rental) => {
        try {
            const url = "http://localhost:8080/api/v1/rentals/return-book";
            const response = await axios.post(
                url,
                {
                    bookTitle: rental.title,
                    userEmail: localStorage.getItem("userEmail"),
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            setIsOperationSuccessful(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Cărțile închiriate de tine</Modal.Title>
                </Modal.Header>
                <Modal.Body className="user-rentals-modal">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Titlul cărții</th>
                            <th>Data împrumutului</th>
                            <th>Data returnării</th>
                            <th>Statut / Acțiuni împrumut</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentRentals.map((rental) => (
                            <tr key={rental.rentalId}>
                                <td>{rental.title}</td>
                                <td>{getDate(rental.rentalDate)}</td>
                                <td>{getDate(rental.returnDate)}</td>
                                <>{rental.status ?
                                    (
                                        <>
                                            <td>
                                                    Returnata
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>
                                                <Button variant="danger" disabled>
                                                    Prelungeste
                                                </Button>
                                            </td>
                                            <td>
                                                <Button variant="success" onClick={() => handleReturn(rental)}>
                                                    Returneaza
                                                </Button>
                                            </td>
                                        </>
                                    )
                                }</>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <PaginationBar
                        elementsPerPage={rentalsPerPage}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                        elements={rentals}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Inchide
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};


export default UserRentals;