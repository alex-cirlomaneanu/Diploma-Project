import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 *
 */
const useFetchEmail = (token) => {
    const [email, setEmail] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "http://localhost:8080/api/v1/getemailbytoken?token=" + token;
                const response = await axios.get(
                    url,
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        },
                    }
                );
                setEmail(response.data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData().then(r => r).catch(err => err);
    }, []);
    return email;
}

export default useFetchEmail;