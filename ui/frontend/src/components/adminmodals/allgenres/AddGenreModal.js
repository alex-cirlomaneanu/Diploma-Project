import React, {useEffect, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Form from "react-bootstrap/Form";

const AddGenreModal = ({ show, onCancel }) => {
    const [formData, setFormData] = useState({});
    const [operationIsSuccessful, setOperationIsSuccessful] = useState(false);

    async function addGenreData(formData) {
        try {
            const url = "http://localhost:8080/api/v1/bookgenre/addbookgenre";
            const response = await axios.post(
                url,
                {
                    genreName: formData.genreName
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
                genreName: ""
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
                  <Modal.Title>Adauga Gen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formGenreName">
                        <Form.Label>Nume gen</Form.Label>
                        <Form.Control
                            type="text"
                            name={"genreName"}
                            value={formData.genreName}
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

export default AddGenreModal;