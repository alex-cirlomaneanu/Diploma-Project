import React, {useState, useContext} from "react";
import fetchAllGenres from "../../api/fetchdata/fetchAllGenres";
import "./Genres.css"

const Genres = () => {
    const genresRaw = fetchAllGenres();
    const genres = genresRaw.sort( (a, b) => a.genreName.localeCompare(b.genreName));

    return (
        <div className={"all-genres"}>
            <h1>Genuri literare</h1>
            <img src="/search.png"   alt={"genres"}/>
            <ul>
                {genres.map(genre => (
                    <li key={genres.genreId}>
                        <a href={`/genres/${genre.genreName}`}>{genre.genreName}</a>
                    </li>
                ))}
                <li>
                    <a href={`/books`}><b>Vezi toate cărțile</b></a>
                </li>
            </ul>
        </div>
    );
}

export default Genres;