import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchUser = (userEmail) => {
    const [user, setUser] = useState({});

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
    return user;
}

export default useFetchUser;