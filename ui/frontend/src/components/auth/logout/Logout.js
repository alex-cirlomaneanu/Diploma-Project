import React, {useContext} from "react";
import {useNavigate} from "react-router";
import {AuthContext} from "../../../utils/auth";
import axios from "axios";

function Logout() {
    const navigate = useNavigate();
    const logout = useContext(AuthContext);

    const handleLogout = async (event) => {
        try {
            await axios.post('http://localhost:8080/api/v1/auth/logout',
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
            logout.logout();
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;