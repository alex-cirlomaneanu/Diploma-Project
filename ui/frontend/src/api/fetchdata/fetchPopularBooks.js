import {useEffect, useState} from "react";
import axios from "axios";

const useFetchPopularBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/getpopularbooks", {
                });
                setBooks(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then(r => r).catch(err => err);
    }, []);

    return books;
}

export default useFetchPopularBooks;