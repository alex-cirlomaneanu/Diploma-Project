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
    const login = useContext(AuthContext);
    const {setUserId} = useContext(AuthContext);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = {
                email,
                password
            }
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', user);
            login.login();
            setUserId(email);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }
    };

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
                {error && <p className="error">{error}</p>}
            </Form>
        </div>
    );
};

export default Login;
