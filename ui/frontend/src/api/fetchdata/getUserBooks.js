import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchUserBooks = (userEmail) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'http://localhost:8080/api/v1/rentals/get-rentals-by-user?userEmail=' + userEmail;
                const response = await axios.get(url,
                    {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('token')
                        }
                    }
                );
                setBooks(response.data);
                console.log(books);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData().then(r => console.log(r));
    }, []);
    return books;
}

export default useFetchUserBooks;