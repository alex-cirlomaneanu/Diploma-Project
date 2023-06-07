import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router";

import axios from 'axios';
import { Form, Button, Col,  } from 'react-bootstrap';
import "./Register.css";
import WebsiteLayout from "../../components/layout/websitelayout/WebsiteLayout";
import {AuthContext} from "../../components/auth/Auth";


function Register() {
    const navigate = useNavigate();
    const [passwordStrength, setPasswordStrength] = useState('');
    const authContext = useContext(AuthContext);

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
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    const handlePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
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

    if (authContext.authenticated) {
        navigate('/');
    }

    return (
        <div className="register-container">
            <h2>Înregistrare</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className={"custom-form-group"}>
                    <Form.Label>Email</Form.Label>
                    <br/>
                    <Form.Control type={'text'} id={'email'} value={email} onChange={(event) => setEmail(event.target.value)}
                    placeholder={"@email"}/>
                </Form.Group>
                <Form.Group controlId="password" className={"custom-form-group"}>
                    <Form.Label>Parola</Form.Label>
                    <br/>
                    <Form.Control type="password" value={password} onChange={(event) => { handlePassword(event)}}
                                  placeholder={"********"}/>
                </Form.Group>
                <Form.Group controlId="firstname" className={"custom-form-group"}>
                    <Form.Label>Prenume</Form.Label>
                    <br/>
                    <Form.Control type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)}
                    placeholder={"Ion"}/>
                </Form.Group>
                <Form.Group controlId="lastname" className={"custom-form-group"}>
                    <Form.Label>Nume de familie</Form.Label>
                    <br/>
                    <Form.Control type="text" value={lastname} onChange={(event) => setLastname(event.target.value)}
                    placeholder={"Popescu"}/>
                </Form.Group>
                <Form.Group controlId="phoneNumber" className={"custom-form-group"}>
                    <Form.Label>Număr de telefon</Form.Label>
                    <br/>
                    <Form.Control type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}
                    placeholder={"07123123123"}/>
                </Form.Group>
                <Form.Group controlId="birthDate" className={"custom-form-group"}>
                    <Form.Label>Data nașterii</Form.Label>
                    <br/>
                    <Form.Control type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)}
                    placeholder={"01-01-1970"}/>
                </Form.Group>
                <Button className="register-button" variant="primary" type="submit">Înregistreză-te</Button>
                {password &&
                    <Form.Text className="password-strength">{passwordStrength}</Form.Text>
                }
            </Form>
        </div>
    );

}


export default Register;