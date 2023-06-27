import React, {useState, useContext} from "react";
import {useParams} from "react-router";
import fetchBookByAuthor from "../../api/fetchdata/books/fetchBookByAuthor";
import "./AuthorPage.css"

const AuthorPage = () => {
    const params = useParams();
    const authorName = params.authorName;
    const books = fetchBookByAuthor(authorName);
    console.log(books)

    return (
        <div className={"author-page"}>
            <h1>{authorName}</h1>
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

export default AuthorPage;