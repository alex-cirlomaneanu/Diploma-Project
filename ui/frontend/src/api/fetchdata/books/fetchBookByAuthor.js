import {useEffect, useState} from "react";
import axios from "axios";

const useFetchBooksByAuthor = (authorName) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorNameEdited = authorName.replace(" ", "%20");
                const url = `http://localhost:8080/api/v1/authors/getallbooksbyauthorname?authorName=${authorNameEdited}`;
                const response = await axios.get(url,
                    {
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
}

export default useFetchBooksByAuthor;