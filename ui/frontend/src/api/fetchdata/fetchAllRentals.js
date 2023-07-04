import {useEffect, useState} from "react";
import axios from "axios";

const useFetchAllRentals = () => {
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/rentals/get-all-rentals",
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    });
                console.log("Rentals: ", response.data)
                setRentals(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then(r => r).catch(err => err);
    }, []);

    return rentals;
}

export default useFetchAllRentals;