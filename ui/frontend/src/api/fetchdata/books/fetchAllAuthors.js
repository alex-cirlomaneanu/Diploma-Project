import {useState, useEffect} from "react";
import axios from "axios";

/**
 * Fetches all popular books from the database.
 * @returns {Array} An array of popular books.
 */
const useFetchAllAuthors = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/v1/authors/getallauthors`;
                const response = await axios.get(url,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    });
                setAuthors(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then(r => r).catch(err => err);
    }, []);

    return authors;
}

export default useFetchAllAuthors;
