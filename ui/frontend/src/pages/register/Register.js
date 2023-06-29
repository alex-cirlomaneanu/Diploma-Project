import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router";

import axios from 'axios';
import { Form, Button,  } from 'react-bootstrap';
import "./Register.css";
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
    const [address, setAddress] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [bankAccount, setBankAccount] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            email,
            password,
            firstname,
            lastname,
            phoneNumber,
            address,
            bankAccount,
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

    const [isValid, setIsValid] = useState(false);

    const handleBankAccount = (e) => {
        const input = e.target.value;
        const formattedInput = input.replace(/ /g, ''); // Elimină spațiile din numărul de card

        setBankAccount(formattedInput);

        // Verifică validitatea numărului de card
        const regex = /^4\d{3}\s?\d{4}\s?\d{4}\s?\d{4}$/;
        const isValidCardNumber = regex.test(formattedInput);
        setIsValid(isValidCardNumber);
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
                    <Form.Control type={'text'} value={email} onChange={(event) => setEmail(event.target.value)}
                    placeholder={"@email"}/>
                </Form.Group>
                <Form.Group controlId="password" className={"custom-form-group"}>
                    <Form.Label>Parola</Form.Label>
                    <br/>
                    <Form.Control type="password" value={password} onChange={(event) => { handlePassword(event)}}
                                  placeholder={"********"}/>
                    {password &&
                        <Form.Text className="password-strength">{passwordStrength}</Form.Text>
                    }
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
                <Form.Group controlId="bankAccount" className={"custom-form-group"}>
                    <Form.Label>Cont bancar</Form.Label>
                    <br/>
                    <Form.Control type="text" value={bankAccount} onChange={(event) => { handleBankAccount(event)}}
                    placeholder={"XXXX XXXX XXXX XXXX"}/>
                    {
                        isValid ? <Form.Text className="text-muted">Numărul de card este valid</Form.Text> :
                            <Form.Text className="text-muted">Numărul de card nu este valid</Form.Text>
                    }
                </Form.Group>
                <br/>
                <Button className="register-button" variant="primary" type="submit">Înregistreză-te</Button>
            </Form>
        </div>
    );

}


export default Register;