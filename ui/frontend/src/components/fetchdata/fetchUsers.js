import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Fetches all users from the database.
 * @returns {Array} An array of users.
 */
const useFetchUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/appuser/getallusers", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData().then(r => r).catch(err => err);
    }, []);
    return users;
}

export default useFetchUsers;