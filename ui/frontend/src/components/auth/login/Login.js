import React, { useState, useContext } from 'react';
import {useNavigate} from "react-router";
import { Form, Button, Row, Col } from 'react-bootstrap';
import {AuthContext, AuthProvider} from "../../../utils/auth";
import "./Login.css";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = {
                email,
                password
            }
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', user);
            authContext.login();
            localStorage.setItem('userEmail', email);
            console.log(authContext);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            console.error(error);
            setError(" Email sau parola incorecte! ");
        }
    };

    const handleCloseError = () => {
        setError('');
    }

    return (
        <div className="login-container">
            <h2>Autentificare</h2>
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
                    <Form.Label column sm="2">Parola</Form.Label>
                    <br/>
                    <Col sm={"10"}>
                    <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)}
                    placeholder="Parola"/></Col>
                </Form.Group>
                <Button className="login-button" variant="primary" type="submit">
                    Conecteaza-te
                </Button>
                {error && (
                    <div className="error">
                        <br/>
                        <button onClick={handleCloseError} className="close-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="feather feather-alert-triangle">
                                <path
                                    d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </button>
                        <p>{error}</p>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default Login;
