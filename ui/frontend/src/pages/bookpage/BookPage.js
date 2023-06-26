import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../components/auth/Auth";
import {useParams} from "react-router";
import "./BookPage.css";
import BookPageImage from "../../components/bookpage/bookpageimage/BookPageImage";
import BookPageDetails from "../../components/bookpage/bookpagedetails/BookPageDetails";

const BookPage = () => {
    const params = useParams();
    const [book, setBook] = useState([]);
    const authContext = useContext(AuthContext)
    const authorName = book.author != null ? book.author.authorName : "";
    const bookGenres = Array.isArray(book.bookGenres)
        ? book.bookGenres.map(genre => genre.genreName).join(", ")
        : ""
    const [similarBooks, setSimilarBooks] = useState([]);

    if (!authContext.authenticated) {
        authContext.navigate("/login");
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const url = `http://localhost:8080/api/v1/book/getbookbyid/{bookId}?bookId=${params.bookId}`;
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
        }
        let r = fetchData();
    }, []);

    return (
        <div>
            <div className="book-page">
                <BookPageImage book={book}/>
                <BookPageDetails book={book}  />
            </div>
        </div>
    );
}

export default BookPage;