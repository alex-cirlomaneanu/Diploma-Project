import React, {useState, useContext} from "react";
import fetchAllAuthors from "../../api/fetchdata/books/fetchAllAuthors";
import "./Authors.css"
import {Image} from "react-bootstrap";

const Authors = () => {
    const authorsRaw = fetchAllAuthors();
    const authors = authorsRaw.sort( (a, b) => a.authorName.localeCompare(b.authorName));

    return (
        <div className={"all-authors"}>
            <h1>Autori</h1>
            <img src="/writer.png"   alt={"writer"}/>
            <ul>
                {authors.map(author => (
                    <li key={authors.authorId}>
                        <a href={`/authors/${author.authorName}`}>{author.authorName}</a>
                    </li>
                ))}
                <li>
                    <a href={`/books`}><b>Vezi toate cărțile</b></a>
                </li>
            </ul>
        </div>
    );
}

export default Authors;