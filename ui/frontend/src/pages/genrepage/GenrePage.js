import React, {useState, useContext} from "react";
import "./GenrePage.css";
import {useParams} from "react-router";
import fetchBookByGenre from "../../api/fetchdata/books/fetchBookByGenre";

const GenrePage = () => {
    const params = useParams();
    const genreName = params.genreName;
    const books = fetchBookByGenre(genreName);
    console.log(books)

    return (
        <div className={"genre-page"}>
            <h1>{genreName}</h1>
            <ul>
                {books.map(book => (
                    <li key={book.bookId}>
                        <a href={`/books/${book.bookId}`}>{book.title}</a>
                    </li>
                ))}
                <li>
                    <a href={`/books`}><b>Vezi toate cărțile</b></a>
                </li>
            </ul>
        </div>
    );
}

export default GenrePage;