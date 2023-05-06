import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080//]api/v1/auth/authenticate', {
                username,
                password
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input type={'text'} id={'username'} value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type={'password'} id={'password'} value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button type={'submit'}>Login</button>
        </form>
    );
};

export default Login;