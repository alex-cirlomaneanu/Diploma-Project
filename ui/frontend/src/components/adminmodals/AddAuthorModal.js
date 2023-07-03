import React, {useEffect, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Form from "react-bootstrap/Form";

const AddAuthorModal = ({ show, onCancel }) => {
    const [formData, setFormData] = useState({});
    const [operationIsSuccessful, setOperationIsSuccessful] = useState(false);

    async function addGenreData(formData) {
        try {
            const url = "http://localhost:8080/api/v1/authors/addauthor";
            const response = await axios.post(
                url,
                {
                    authorName: formData.authorName
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
            setFormData(
                {
                    authorName: ""
                }
            )
            if (operationIsSuccessful) {
            }
        }
        , [operationIsSuccessful]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        if (formData) {
            addGenreData(formData).then(r => console.log(r));
            setOperationIsSuccessful(true);
        }
    }
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Adauga Autor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formGenreName">
                        <Form.Label>Nume complet autor</Form.Label>
                        <Form.Control
                            type="text"
                            name={"authorName"}
                            value={formData.authorName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Gata
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Anuleaza
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddAuthorModal;