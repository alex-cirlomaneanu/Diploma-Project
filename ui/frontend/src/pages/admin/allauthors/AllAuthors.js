import React, {useState} from "react";
import {Button, Table} from "react-bootstrap";
import fetchAllAuthors from "../../../api/fetchdata/books/fetchAllAuthors";
import PaginationBar from "../../../components/general/pagination/Pagination";

const AllAuthors = () => {
    const authors = fetchAllAuthors();
    const [currentPage, setCurrentPage] = useState(1);
    const [authorsPerPage] = useState(10);

    const indexOfLastAuthor = currentPage * authorsPerPage;
    const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
    const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="container">
            <h1>Toti Autorii</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>ID autor</th>
                    <th>Nume complet</th>
                </tr>
                </thead>
                <tbody>
                {currentAuthors.map((author, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{author.authorId}</td>
                        <td>{author.authorName}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <PaginationBar
                elements={authors}
                elementsPerPage={authorsPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default AllAuthors;