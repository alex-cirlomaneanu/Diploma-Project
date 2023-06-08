import React, {useState} from "react";
import { Table, Button, Modal} from "react-bootstrap";
import getUserRentals from "../../api/fetchdata/getUserRentals";
import PaginationBar from "../pagination/Pagination";
import "./UserRentals.css";

const UserRentals = ({ show, handleClose, userId} ) => {
    const rentals = getUserRentals(userId);
    const [currentPage, setCurrentPage] = useState(1);
    const [rentalsPerPage] = useState(10);
    const indexOfLastRental = currentPage * rentalsPerPage;
    const indexOfFirstRental = indexOfLastRental - rentalsPerPage;
    const currentRentals = rentals.slice(indexOfFirstRental, indexOfLastRental);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Cartile inchiriate de tine</Modal.Title>
                </Modal.Header>
                <Modal.Body className="user-rentals-modal">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Titlul cartii</th>
                            <th>Data imprumutului</th>
                            <th>Data returnarii</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentRentals.map((rental) => (
                            <tr key={rental.rentalId}>
                                <td>{rental.title}</td>
                                <td>{rental.rentalDate}</td>
                                <td>{rental.returnDate}</td>
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