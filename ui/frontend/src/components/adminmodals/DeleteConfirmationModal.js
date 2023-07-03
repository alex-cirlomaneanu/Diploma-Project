import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteConfirmationModal = ({ show, onDelete, onCancel }) => {
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Stergeti cu siguranta acest obiect?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Anuleaza
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Confirma
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;
