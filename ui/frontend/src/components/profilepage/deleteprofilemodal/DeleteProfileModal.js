import React, {useEffect, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import "./DeleteProfileModal.css";
import getDate from "../../../api/calendardate/calendardate";
import deleteUserData from "../../../api/fetchdata/appuser/deleteUserData";

const DeleteProfileModal = ({ show, handleClose, authContext, userId }) => {
    const [operationIsSuccessfull, setOperationIsSuccessfull] = useState(false);
    useEffect(() => {
        if (operationIsSuccessfull) {
            authContext.navigate("/");
        }
    }, [userId, operationIsSuccessfull]);

    const handleChange = (e) => {

    }

    const handleSubmit = () => {
        authContext.logout().then(r => console.log(r));
        deleteUserData(userId);
        setOperationIsSuccessfull(true);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Șterge contul</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"delete-form-container"}>
                Ești sigur că vrei să ștergi contul?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Înapoi
                </Button>
                <Button variant="danger" onClick={handleSubmit}>
                    Șterge
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteProfileModal;