import React, {useEffect, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import "./EditProfileModal.css";
import getDate from "../../../api/calendardate/calendardate";
import editUserData from "../../../api/fetchdata/appuser/editUserData";
import axios from "axios";

const EditProfileModal = ({ show, handleClose, user }) => {
    const [formData, setFormData] = useState({});
    const [operationIsSuccessful, setOperationIsSuccessful] = useState(false);

    const [isValid, setIsValid] = useState(true);

    const handleBankAccount = (e) => {
        const input = e.target.value;
        const formattedInput = input.replace(/ /g, ''); // Elimină spațiile din numărul de card

        handleChange(e);

        // Verifică validitatea numărului de card
        const regex = /^4\d{3}\s?\d{4}\s?\d{4}\s?\d{4}$/;
        const isValidCardNumber = regex.test(formattedInput);
        setIsValid(isValidCardNumber);
    }

    useEffect(() => {
        if (!user) return;
        setFormData({
            userId: user.userId,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            bankAccount: user.bankAccount,
            birthDate: user.birthDate,
        });

        if (operationIsSuccessful) {
            window.location.reload();
        }
    }, [user, operationIsSuccessful]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        editUserData(formData);
        handleClose();
        setOperationIsSuccessful(true);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editează informațiile personale</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"edit-form-container"}>
                <Form onSubmit={handleSubmit}>
                    {/* Input fields for editing user information */}
                    <Form.Group controlId="firstname">
                        <Form.Label>Prenume</Form.Label>
                        <br/>
                        <Form.Control
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="lastname">
                        <Form.Label>Nume</Form.Label>
                        <br/>
                        <Form.Control
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Număr de telefon</Form.Label>
                        <br/>
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="birthDate">
                        <Form.Label>Data nașterii</Form.Label>
                        <br/>
                        <p>{getDate(formData.birthDate)}</p>
                        <Form.Control
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="address">
                        <Form.Label>Adresă</Form.Label>
                        <br/>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="bankAccount">
                        <Form.Label>Număr de card</Form.Label>
                        <br/>
                        <Form.Control
                            type="text"
                            name="bankAccount"
                            value={formData.bankAccount}
                            onChange={handleBankAccount}
                        />
                        <p className={"card-number-validation"}>{isValid ? "Număr de card valid" : "Număr de card invalid"}</p>
                    </Form.Group>

                    {/* Add more fields as needed */}
                    <din className={"edit-form-buttons"}>
                        <Button variant="primary" onClick={() => handleSubmit()}>
                            Salvează
                        </Button>

                        <Button variant="secondary" onClick={handleClose}>
                            Închide
                        </Button>
                    </din>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfileModal;
