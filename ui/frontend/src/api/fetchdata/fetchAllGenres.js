import {useEffect, useState} from "react";
import axios from "axios";

const useFetchAllGenres = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/bookgenre/getallbookgenres",
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                });
                setGenres(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then(r => r).catch(err => err);
    }, []);

    return genres;
}

export default useFetchAllGenres;