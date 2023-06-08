import axios from "axios";
import { useEffect, useState } from "react";
import {useLocation} from "react-router";

const getUserRentals = (userId) => {
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'http://localhost:8080/api/v1/appuser/getuserentals?userId=' + userId;
                const response = await axios.get(url,
                    {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token')
                        }
                    }
                );
                setRentals(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        if (userId)
            fetchData().then(r => r);
    }, [userId]);
    return rentals;
}

export default getUserRentals;