import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Fetches all books from the database.
 * @returns {Array} An array of books.
 */
const useFetchBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/book/getallbooks", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                });
                setBooks(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then(r => r).catch(err => err);
    }, []);

    return books;
};

export default useFetchBooks;
