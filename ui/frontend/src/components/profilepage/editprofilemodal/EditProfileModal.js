import React, {useEffect, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import "./EditProfileModal.css";
import getDate from "../../../api/calendardate/calendardate";
import editUserData from "../../../api/fetchdata/appuser/editUserData";

const EditProfileModal = ({ show, handleClose, user }) => {
    const [formData, setFormData] = useState({});
    const [operationIsSuccessful, setOperationIsSuccessful] = useState(false);

    useEffect(() => {
        if (!user) return;
        setFormData({
            userId: user.userId,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phoneNumber: user.phoneNumber,
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