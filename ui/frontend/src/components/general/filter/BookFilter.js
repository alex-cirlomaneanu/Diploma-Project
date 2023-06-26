import React, {useEffect, useState} from "react";

const BookFilter = ({books, setFilteredBooks}) => {
    const [filter, setFilter] = useState("");
    const filters = ["title", "author", "genre"];


    return (
        <div className="book-filter">
            <label htmlFor="filter">Filtrează după:</label>
            <select
                className="form-control"
                id="filter"
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="">Alege...</option>
                {filters.map((filter, index) => (
                    <option key={index} value={filter}>
                        {filter}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BookFilter;