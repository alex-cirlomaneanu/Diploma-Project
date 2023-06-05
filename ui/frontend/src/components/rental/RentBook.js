import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import getEmail from "../../api/fetchdata/getEmail";
import getRental from "../../api/fetchdata/getRental";

const RentalHandler = ({ bookTitle }) => {
    const email = getEmail(localStorage.getItem("token"));
    const rental = getRental(bookTitle, email);
    const rentalExists = rental !== null

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [errorModalShow, setErrorModalShow] = useState(false);
    const [isOperationSuccessful, setIsOperationSuccessful] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleErrorModalClose = () => setErrorModalShow(false);
    const handleErrorModalShow = () => setErrorModalShow(true);
    const handleRental = async () => {
        try {
            const url = "http://localhost:8080/api/v1/rentals/rent-book";
            const response = await axios.post(
                url,
                {
                    bookTitle: bookTitle,
                    userEmail: email,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            setResponse(response.data);
            handleClose();
            setIsOperationSuccessful(true);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                setError(error.response.data); // Custom error message from the backend
                handleErrorModalShow(); // Show the error modal
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
        }
    };

    const handleReturn = async () => {
        try {
            const url = "http://localhost:8080/api/v1/rentals/return-book";
            const response = await axios.post(
                url,
                {
                    bookTitle: bookTitle,
                    userEmail: email,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            setResponse(response.data);
            setIsOperationSuccessful(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(isOperationSuccessful) {
            window.location.reload();
        }
    }, [isOperationSuccessful]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmare</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        rentalExists ? (
                            <p>
                                Ești sigur că vrei să returnezi cartea?
                            </p>
                        ) : (
                            <p>
                                Ești sigur că vrei să împrumuți cartea?
                            </p>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Înapoi
                    </Button>
                    {
                        rentalExists ? (
                            <Button variant="primary" onClick={handleReturn}>
                                Returnează cartea
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleRental}>
                                Împrumută cartea
                            </Button>
                        )
                    }
                </Modal.Footer>
            </Modal>
            {
                rentalExists ? (
                    <>
                        <p>
                            Ai împrumutat deja cartea
                        </p>
                        <Button variant="primary" onClick={handleShow}>
                            Returnează cartea
                        </Button>
                    </>
                ) : (
                    <Button variant="primary" onClick={handleShow}>
                        Împrumută cartea
                    </Button>
                )
            }

            <Modal show={errorModalShow} onHide={handleErrorModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eroare</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleErrorModalClose}>
                        Închide
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RentalHandler;