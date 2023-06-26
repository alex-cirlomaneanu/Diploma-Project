import axios from "axios";
import { useEffect, useState} from "react";

const getBook = (bookId) => {
    const [book, setBook] = useState([]);
    useEffect(() => {
       const fetchData = async () => {
           try {
               const url = `http://localhost:8080/api/v1/book/getbookbyid/{bookId}?bookId=${bookId}`;
               const response = await axios.get(url,
                   {
                       headers: {
                           Authorization: "Bearer " + localStorage.getItem('token')
                       }
                   })
               setBook(response.data);
               if (book.bookImage === null) {
                   book.bookImage = "/book-cover.jpg";
               }
           } catch (error) {
               console.error(error);
           }
       };

       fetchData().then(r => r).catch(err => err);

    }, []);

    return book;
}

export default getBook;