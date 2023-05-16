import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AuthContext} from "../../utils/auth";

function AppUser () {
    const [user, setUser] = useState({});
    let userEmail = localStorage.getItem('userEmail');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'http://localhost:8080/api/v1/appuser/userdetalis/{userEmail}?userEmail=' + userEmail;
                const response = await axios.get(url,
                    {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token')
                        }
                    }
                );
                setUser(response.data);
                console.log(user);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData().then(r => console.log(r));
    }, []);


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