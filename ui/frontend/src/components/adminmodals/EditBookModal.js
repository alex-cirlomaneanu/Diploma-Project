import React, {useEffect, useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import editBookData from "../../api/fetchdata/books/editBookData";
import axios from "axios";

const EditBookModal = ({ show, book, handleClose, author, genres }) => {
    const [formData, setFormData] = useState({});
    const [operationIsSuccessful, setOperationIsSuccessful] = useState(false);

    useEffect(() => {
        if (!book) return;
        console.log("Book: ", book);
            setFormData({
                bookId: book.bookId,
                title: book.title,
                image: book.bookImage,
                authorName: author,
                genres: genres,
                totalCopies: book.totalCopies
            });
        if (operationIsSuccessful) {
            window.location.reload();
        }
    }, [book, operationIsSuccessful]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        console.log(formData);
        try {
            const url =`http://localhost:8080/api/v1/book/updatebook`;
            const response =
                axios.put(
                    url,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        }
                    });
            // setOperationIsSuccessful(true);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editeaza cartea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Titlu</Form.Label>
                        <Form.Control
                            type="text"
                            name={"title"}
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control
                            type="text"
                            name={"authorName"}
                            value={formData.authorName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGenres">
                        <Form.Label>Genuri</Form.Label>
                        <Form.Control
                            type="text"
                            name={"genres"}
                            value={formData.genres}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditBookModal;
