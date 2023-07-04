import React, {useEffect, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";

const EditGenreModal = ({ show, onCancel, genre }) => {
    const [formData, setFormData] = useState({});
    const [operationIsSuccessful, setOperationIsSuccessful] = useState(false);

    useEffect(() => {
        if (!genre) return;
        setFormData({
            bookGenreName: genre.genreName,
            newBookGenreName: genre.genreName,
        });

        if (operationIsSuccessful) {
            window.location.reload();
        }
    }, [genre, operationIsSuccessful]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        try {
            const url = `http://localhost:8080/api/v1/bookgenre/updatebookgenre?bookGenreName=${formData.bookGenreName}&newBookGenreName=${formData.newBookGenreName}`
            const response = axios.put(
                url,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
            setOperationIsSuccessful(true);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Editează numele genului</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"edit-form-container"}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="newBookGenreName">
                        <Form.Label>Noul nume</Form.Label>
                        <br/>
                        <Form.Control
                            type="text"
                            name="newBookGenreName"
                            value={formData.newBookGenreName}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    {/* Add more fields as needed */}
                    <div className={"edit-form-buttons"}>
                        <Button variant="primary" onClick={() => handleSubmit()}>
                            Salvează
                        </Button>

                        <Button variant="secondary" onClick={onCancel}>
                            Închide
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditGenreModal;
