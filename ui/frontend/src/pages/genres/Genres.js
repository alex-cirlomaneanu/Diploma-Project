import React, {useState, useContext} from "react";
import fetchAllGenres from "../../api/fetchdata/fetchAllGenres";

const Genres = () => {
    const genres = fetchAllGenres();

    return (
        <div>
            <h1>Genres</h1>
            <ul>
                {genres.map(genre => (
                    <li key={genres.genreId}>
                        <a href={`/genres/${genre.genreName}`}>{genre.genreName}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Genres;