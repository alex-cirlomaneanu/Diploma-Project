import {useEffect, useState} from "react";
import axios from "axios";

const findSimilarBooks = (book) => {
    const [books, setBooks] = useState([]);

    const fetchData = async () => {
        try {
            console.log(book.bookId)
            const url = `http://localhost:8080/api/v1/book/findsimilarbooks?bookId=${book.bookId};`
            const response =
                await axios.get(url,
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

    fetchData().then(r => console.log(r));

    return books;
}

export default findSimilarBooks;