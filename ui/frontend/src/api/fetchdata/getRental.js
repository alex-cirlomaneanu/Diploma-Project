import { useEffect, useState} from "react";
import axios from "axios";

const useFetchRental = (bookTitle, userEmail) => {
    const [rental, setRental] = useState(null);

    useEffect(() =>{
        const fetchData = async () => {
            try {
                console.log(userEmail + " "+ bookTitle);
                const url =   'http://localhost:8080/api/v1/rentals/get-rental?' +
                    'userEmail=' + userEmail + '&bookTitle=' + bookTitle;
                const response = await axios.get(
                    url,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token')
                        }
                    }
                );

                setRental(response.data);
            } catch (error) {
                console.log(error.response)
            }
        }
        if (bookTitle && userEmail) {
            fetchData().then(r => r).catch(err => err);
        }    }, [bookTitle, userEmail])
    return rental;
}

export default useFetchRental;