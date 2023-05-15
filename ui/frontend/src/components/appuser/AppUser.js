import React, { useState } from 'react';
import axios from 'axios';

function AppUser () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [address, setAddress] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const user = {
        email,
        password,
        firstname,
        lastname,
        phoneNumber,
        // address,
        birthDate
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8080/api/v1/app-user/getuserbyemail/', email);
        const user = response.data;
        console.log(response.data);
        }

    return (
        <div>
            <h1>Profil</h1>
            <h2>Informații personale</h2>
            <p>Nume: {user.lastname}</p>
            <p>Prenume: {user.firstname}</p>
            <p>Email: {user.email}</p>
            <p>Număr de telefon: {user.phoneNumber}</p>
            <p>Data nașterii: {user.birthDate}</p>
            {/*<h2>Adrese</h2>*/}
            {/*<p>Adresă de livrare: {user.address}</p>*/}
            {/*<h2>Comenzi</h2>*/}
            {/*<p>Comenzi: {user.orders}</p>*/}

        </div>
    );
}

export default AppUser;