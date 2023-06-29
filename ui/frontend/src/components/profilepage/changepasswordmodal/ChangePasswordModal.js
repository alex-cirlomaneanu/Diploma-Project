import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

const ChangePasswordModal = ({ show, handleClose, userId }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState(true);

    const handlePassword = (event) => {
        const password = event.target.value;
        setNewPassword(password);
        const strength = {
            length: 0,
            hasNumber: false,
            hasLowerCase: false,
            hasUpperCase: false
        }

        strength.length = password.length >= 8 ? 1 : 0;
        strength.hasNumber = password.match(/[0-9]/) ? 1 : 0;
        strength.hasLowerCase = password.match(/[a-z]/) ? 1 : 0;
        strength.hasUpperCase = password.match(/[A-Z]/) ? 1 : 0;

        if (strength.length + strength.hasNumber + strength.hasLowerCase + strength.hasUpperCase === 4) {
            setPasswordStrength("Parola puternica");
        } else if (strength.length === 0) {
            setPasswordStrength("Parola prea scurta");
        } else if (strength.hasNumber === 0) {
            setPasswordStrength("Parola trebuie sa contina cel putin \n o cifra");
        } else if (strength.hasUpperCase === 0) {
            setPasswordStrength("Parola trebuie sa contina cel putin \n o litera mare");
        } else {
            setPasswordStrength("Parola trebuie sa contina cel putin \n o litera mica");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform password change logic here
        // You can make an API request to the backend to update the password

        // Reset the form fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        try {
            const url = `http://localhost:8080/api/v1/appuser/changepassword?userId=${userId}&newPassword=${newPassword}`;
            const response = await axios.post(
                url,
                {
                    userId: userId,
                    newPassword: newPassword,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }

        // Close the modal
        handleClose();
    };

    const repeatPassword = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value === newPassword) {
            setRepeatedPassword(true);
        } else {
            setRepeatedPassword(false);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="currentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={(e) => handlePassword(e)}
                        />
                        {newPassword &&
                            <Form.Text className="password-strength">{passwordStrength}</Form.Text>
                        }
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => repeatPassword(e)}
                        />
                        {!repeatedPassword ?
                            <Form.Text className="password-strength">Parolele nu coincid</Form.Text> : null
                        }
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Change Password
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ChangePasswordModal;
