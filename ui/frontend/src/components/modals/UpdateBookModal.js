import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateBookModal = ({ book, onUpdate }) => {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [genres, setGenres] = useState(book.genres);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedBook = { ...book, title, author, genres };
        onUpdate(updatedBook);
    };

    return (
        <Modal show={true} onHide={() => onUpdate(null)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGenres">
                        <Form.Label>Genres</Form.Label>
                        <Form.Control
                            type="text"
                            value={genres}
                            onChange={(e) => setGenres(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateBookModal;
