import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col,  } from 'react-bootstrap';
import "./Register.css";
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [address, setAddress] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            email,
            password,
            firstname,
            lastname,
            phoneNumber,
            // address,
            birthDate
        };
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', user);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="register-container">
            <h2>Înregistrare</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <br/>
                    <Form.Control type={'text'} id={'email'} value={email} onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <br/>
                    <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>
                <Form.Group controlId="firstname">
                    <Form.Label>Firstname</Form.Label>
                    <br/>
                    <Form.Control type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)} />
                </Form.Group>
                <Form.Group controlId="lastname">
                    <Form.Label>Lastname</Form.Label>
                    <br/>
                    <Form.Control type="text" value={lastname} onChange={(event) => setLastname(event.target.value)} />
                </Form.Group>
                <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <br/>
                    <Form.Control type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                </Form.Group>
                <Form.Group controlId="birthDate">
                    <Form.Label>Birth Date</Form.Label>
                    <br/>
                    <Form.Control type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
                </Form.Group>
                <Button className="register-button" variant="primary" type="submit">Înregistreză-te</Button>
            </Form>
        </div>
    );

}


export default Register;