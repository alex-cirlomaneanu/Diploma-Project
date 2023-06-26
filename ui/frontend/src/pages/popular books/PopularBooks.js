import React, {useState, useContext, useEffect} from "react";
import "./PopularBooks.css"
import fetchAllGenres from "../../api/fetchdata/fetchAllGenres";
import {DropdownButton, Dropdown} from "react-bootstrap";
import axios from "axios";

const PopularBooks = () => {
    const genres = fetchAllGenres();
    const [selectedGenre, setSelectedGenre] = useState({});
    const [books, setBooks] = useState([]);``

    const showPopularBooks = (genre) => {
        setSelectedGenre(genre);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/getpopularbooksbygenre?genreName=${selectedGenre.genreName}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setBooks(response.data);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData().then(r => r).catch(err => err);
    }, [selectedGenre]);

    return (
        <div className="authors-container">
            <h1 className="authors-results">Cele mai populare cărți</h1>
            <h3>Lista cărților populare în funcție de gen</h3>
            <div className="container py-4">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown">Dropdown <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        {genres.map(genre => (
                            <li key={genre.genreId}>
                                <a className="dropdown-item" onClick={() => showPopularBooks(genre)}>{genre.genreName}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="results">
                    {
                        selectedGenre.genreName? (
                            <div className="popular-books-by-genre">
                                <h3>Cărțile populare din genul {selectedGenre.genreName}</h3>
                                <ul>
                                    {books.map(book => (
                                        <li key={book.bookId}>
                                            <a className="dropdown-item" href={`/books/${book.bookId}`}>{book.title} - {book.author.authorName}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="popular-books-by-genre">
                                <h3>Selectează un gen</h3>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
}

export default PopularBooks;