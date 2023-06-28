import React, {useEffect, useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import editBookData from "../../api/fetchdata/books/editBookData";

const EditBookModal = ({ show, book, handleClose }) => {
    const [formData, setFormData] = useState({});
    const [operationIsSuccessful, setOperationIsSuccessful] = useState(false);

    useEffect(() => {
        if (book) {
            setFormData({
                bookId: book.bookId,
                title: book.title,
                image: book.bookImage,
                authorName: book.author.authorName,
                genres: book.bookGenres.map((genre) => genre.genreName),
                totalCopies: book.totalCopies
            });
        }
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
        if (formData) {
            editBookData(formData);
            handleClose();
            setOperationIsSuccessful(true);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name={"title"}
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            name={"authorName"}
                            value={formData.authorName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGenres">
                        <Form.Label>Genres</Form.Label>
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
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditBookModal;
