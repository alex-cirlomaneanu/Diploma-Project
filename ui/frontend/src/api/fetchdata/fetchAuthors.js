import {useState, useEffect} from "react";
import axios from "axios";

/**
 * Fetches all authors from the database.
 * @returns {Array} An array of authors.
 */
const useFetchAuthors = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/author/getallauthors", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
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
};

export default useFetchAuthors();
