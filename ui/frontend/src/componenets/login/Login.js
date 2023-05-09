import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import "./Login.css";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080//]api/v1/auth/authenticate', {
                username: email,
                password
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" as={Row}>
                    <Form.Label column sm="2">Email</Form.Label>
                    <br/>
                    <Col sm="10">
                    <Form.Control type="text" value={email} onChange={(event) => setEmail(event.target.value)}
                                  placeholder="Email" />
                    </Col>
                </Form.Group>

                <Form.Group controlId="password" as={Row}>
                    <Form.Label column sm="2">Password</Form.Label>
                    <br/>
                    <Col sm={"10"}>
                    <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"/></Col>
                </Form.Group>

                <Button className="login-button" variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
