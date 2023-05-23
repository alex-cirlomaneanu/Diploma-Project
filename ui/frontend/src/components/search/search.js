import React, {useContext, useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import axios from "axios";
import {AuthContext} from "../auth/auth";

const Search = () => {
    const [searchTerm, setSearch] = useState("");
    const authContext = useContext(AuthContext);

    const handleSearch = async (event) => {
        if (searchTerm === "") {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        console.log(searchTerm);
        try {
            const url = "http://localhost:8080/api/v1/book/getbooksbytitlelike";
            const response = await axios(url,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    },
                    params: {
                        bookTitle: searchTerm
                    }
                })
            console.log(response.data);
            authContext.navigate(`/searchresults/${searchTerm}`, {state: {books: response.data, term: searchTerm}});
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form onSubmit={handleSearch} className="d-flex">
            <InputGroup>
                <Form.Control
                    type="search"
                    placeholder="Caută o carte"
                    value={searchTerm}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <Button variant="outline-light" type="submit">
                    Caută
                </Button>
            </InputGroup>
        </Form>
    );
}

export default Search;